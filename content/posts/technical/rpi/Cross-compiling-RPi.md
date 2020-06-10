---
title: Cross-compiling Rust from MacOS to Raspberry Pi
description: My experience writing Rust for the Raspberry Pi on MacOS
author: Amrit Rathie
date: 2020-03-06
draft: false
toc: true
categories:
  - Development
  - Tutorial
tags:
  - development
  - embedded development
  - cross-compiling
  - MacOS
  - Raspberry Pi
  - tutorial
  - walk-through
  - rust
---

Chances are you're here after searching through a couple different articles with similar names. There are a dozen guides for cross-compiling for the Raspberry Pi, and even a couple that are specific to MacOS. When I started my cross-compiling journey, I went article after article, following all the steps that each one outlined. Sometimes they didn't work, sometimes they "half-worked", and, eventually, one process succeeded. However, the process that worked for me was a chimera of different tutorials and how-to's. Hopefully, reading this one will help you. But if not, keep looking! It'll work eventually.

## Background

When I got a Raspberry Pi 4 Model B for my birthday this year, I immediately started toying with small hardware programs. Blinking an LED with Python was cool and all, but I didn't want to be limited to that language when I wrote real programs for the RPi. I wanted to write in the language I was most familiar with: Rust.

## Tutorial

_Note: In this tutorial, I will be cross-compiling an existing executable Rust project for the RPi 4. Certain arguments may be different for the RPi 3 or Zero; for example, `musleabihf` vs just `musleabi`._

Rust generally has an excellent cross-compiling experience; second only to Golang, in my opinion. Just use `rustup` to download the proper compilation target.

The challenge comes at link-time. Because Rust doesn't include it's own linker, it needs to use one present on the host. On Linux, most linkers and standard libraries are available with a simple `apt-get install`. However, on MacOS, you have to search weird corners of the internet until you find the linker you need in a random place.

Once you find a linker, you just need to wire it up correctly, and you're ready to compile!

### Preparation

#### Prerequisites

- A Raspberry Pi

  _Note: This tutorial uses the Raspberry Pi 4 Model B._

- Rustup (`rustup`), the Rust toolchain manager

- Cargo (`cargo`), the Rust build system

- The Rust compiler (`rustc`)

- Homebrew (`brew`), a MacOS package manager

  _Note: you can use a different package manager, but this tutorial is written with the assumption that you are using Homebrew._



#### TLDR

If you're coming back to this tutorial, or you just want to get the solution and move on with your life, here's a quick, shell script summary.

```shell
# Add Rust target
rustup target add armv7-unknown-linux-musleabihf
# Install linker
brew install arm-linux-gnueabihf-binutils
# Configure Cargo with the following:
# [target.armv7-unknown-linux-musleabihf]
# linker = "arm-linux-gnueabihf-ld"
echo "[target.armv7-unknown-linux-musleabihf]\nlinker = \"arm-linux-gnueabihf-ld\"" >> ~/.cargo/config
```



#### Download the compilation target

First we need the proper compilation target for `rustc`. We can ask `rustup` for options (and filter out the non-ARM targets)

```shell
rustup target list | grep "armv7-"
```

The summary of the output is that we need to choose between `-gnu...` and `-musl...` targets. What does this mean exactly? Well, when we compile a Rust program, Rust tries to **statically link** our program. `gnu` or `musl` tell use which `libc`, or C standard library, Rust is going to try to link with—`glibc` or `musl`, respectively. If we were to use `gnu`, we would need access to the GNU libraries on the RPi. There is a way to do this (I used `rsync` to get a copy of my RPi's sysroot), but I was never able to get it to work. It might be easier on linux, since our computer could better understand the RPi's library files, but this is a significant challenge from MacOS.

Instead, we are going to use `musl`, because it will [let us have fully static binaries](https://doc.rust-lang.org/edition-guide/rust-2018/platform-and-target-support/musl-support-for-fully-static-binaries.html), which means we won't need the files from the RPi. Let's download the `musl` target using `rustup`.

```shell
rustup target add armv7-unknown-linux-musleabihf
```

#### Getting a linker

Now that `rustc` can compile for our RPi, we need [a linker](https://en.wikipedia.org/wiki/Linker_(computing)) to link our program. Our Mac comes with a linker (or at least MacOS developer tools does), but this linker only understands code meant to be run on MacOS. If we want to link code that's meant to be run on Linux, we need a linker that understands it. The way this linker is made is by cross-compiling the target linker itself to the host OS.

As I mentioned earlier, the process of getting a cross-compilation linker is generally much easier on Linux. It's usually much more of a challenge on MacOS, but thankfully, someone has done the work for us. There's a nice little package [on Homebrew](https://formulae.brew.sh/formula/arm-linux-gnueabihf-binutils) called `arm-linux-gnueabihf-binutils`. Downloading this "Formula" will get us all the utilities we need to link a program for the RPi.

```shell
brew install arm-linux-gnueabihf-binutils
```

###### What programs does this Formula install?


  - arm-linux-gnueabihf-addr2line
  - arm-linux-gnueabihf-ar
  - arm-linux-gnueabihf-as
  - arm-linux-gnueabihf-c++filt
  - arm-linux-gnueabihf-dwp
  - arm-linux-gnueabihf-elfedit
  - arm-linux-gnueabihf-gprof
  - **arm-linux-gnueabihf-ld**
  - arm-linux-gnueabihf-ld.bfd
  - arm-linux-gnueabihf-ld.gold
  - arm-linux-gnueabihf-nm
  - arm-linux-gnueabihf-objcopy
  - arm-linux-gnueabihf-objdump
  - arm-linux-gnueabihf-ranlib
  - arm-linux-gnueabihf-readelf
  - arm-linux-gnueabihf-size
  - arm-linux-gnueabihf-strings
  - arm-linux-gnueabihf-strip

#### Connecting components

Now that we have a linker, we have to tell `rustc` that it exists and can be used. We can tell  `cargo` the linker's location so that the linker will be used by `rustc`. These options could be passed to cargo in various ways, but the easiest is the `cargo` configuration file. There are two choices here.

1. Globally specifiy the linker (in `~/.cargo/config`)

2. Specify it just for the current project (in `./.cargo/config`)

I prefer the first option, simply because I don't expect to use different linkers for different projects. Besides, if I need to, I can override the global config with a project level config.

Open the config file of your choosing (we'll go with `~/.cargo/config` for this tutorial) and tell `cargo` to use the linker we just downloaded when building for our Raspberry Pi.

_Note: Since we used Homebrew, we can just tell `cargo` the name of the program, since it was added to our `$PATH` variable. You can always specify the real path if you prefer that._

```toml
[target.armv7-unknown-linux-musleabihf]
linker = "arm-linux-gnueabihf-ld"
ar = "arm-linux-gnueabihf-ar" # optional
```

_Note: I also specified `ar` since there is a spot for it, but this shouldn't make a difference unless we are building a library._

### Compiling

#### Project creation

At this point, you're ready to start compiling your program. If you have a program ready you want to compile, great! Otherwise, create a new "Hello, World!" project.

```shell
cargo new hello --bin
```

#### Compliation

Now that everything is set up, we can easily compile our program by specifying the target that `cargo` should build our program for. In this case, it's what we downloaded earlier: `armv7-unknown-linux-musleabihf`. We can pass this target to `cargo` using the `--target` flag

```shell
cargo build --target armv7-unknown-linux-musleabihf
# or
cargo build --target="armv7-unknown-linux-musleabihf"
```

_Note: [We don't always have to specify it](#set-default-build-target)_

And now, assuming nothing went wrong, we should have an executable waiting for us in the `target/armv7-unknown-linux-musleabihf/debug/` directory.

_Note: We can also build it with the `--release` flag for optimizations._

### Next Steps

Now that we have an executable that will run on our Raspberry Pi, we need to send it over and execute it. There are plenty of other ways to do this, such as `sftp` and `rsync`, but this tutorial will use `scp` and `ssh`. `scp`, "secure copy", will transfer the file to the Pi, and `ssh`, "secure shell", will remotely execute it. You can learn how to use these programs by inspecting their `man` pages.

_Note: Both of these programs require remote connection to the device. This process is out of the scope of the tutorial, but you can look on Raspberry Pi's website for a [guide on remote access](https://www.raspberrypi.org/documentation/remote-access/), as well as specific tutorials on [`ssh`](https://www.raspberrypi.org/documentation/remote-access/ssh/) and [`scp`](https://www.raspberrypi.org/documentation/remote-access/ssh/scp.md)_

#### Example

##### Copy

 Let's copy our `hello` executable (built for release) to the `/home/pi/projects/hello/` directory on the Pi.

```shell
scp target/armv7-unknown-linux-musleabihf/release/hello pi@raspberrypi.local:projects/hello/
```

_Note: You can replace `pi` with the correct user name and `raspberrypi.local` with the correct name of the device on the network if these names are different from their defaults._

_Note: We could also use the Pi's IP address instead of `raspberrypi.local`._

`scp` will then prompt you for the password for the given user, and then upload the file.

##### Run

Next we need to run our `hello` executable with `ssh`.

```shell
ssh pi@raspberrypi.local projects/hello/hello
```

_Note: You could also log in to the Pi,navigate to the `projects/hello` directory and run the executable with `./hello`_

If everything goes well, our program will print "Hello, World!" to the screen.

## Tips and Tricks

### Set default build target

Once everything is set up, you can build your program with the `cargo` command:

```shell
cargo build --target armv7-unknown-linux-musleabihf
```

Issuing this command over and over makes you really good at typing "armv7-unknown-linux-musleabihf". Overly specific keyboard skills notwithstanding, this gets incredibly annoying after a while.

To automate this, you configure cargo from your project directory to build for this target by default.

```toml
# .cargo/config
[build]
target = "armv7-unknown-linux-musleabihf"
```

### Using architecture specific features

Rust has cool optimizations, such as auto-vectorization, that can be accessed by telling `rustc` what CPU you're building for. A good shortcut for this when building for the machine you're writing the code on is specifying `RUSTFLAGS="-C target-cpu=native"`. This won't work for us, however, because we're cross-compiling. If we want platform specific optimizations for our program, we need to specify the `target-cpu` as something other than `native`. 

The correct argument is different based on which model of Raspberry Pi you are targetting. Let's first find out what our options are. To do this, we need to call `rustc`. Specify the target you are building for, and then ask `rustc` to print all the CPUs it can target.

```shell
rustc --target armv7-unknown-linux-musleabihf --print target-cpus
```

It might be a good idea to filter the results if you sort-of know what you are looking for

```shell
rustc --target armv7-unknown-linux-musleabihf --print target-cpus | grep cortex
```

Now, find out which CPU your RPi has. It is better to just look this up on Raspberry Pi's website, rather than guessing or relying on a tutorial.

For example, I am using the [Raspberry Pi 4 Model B](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/specifications/). The specifications for this model say: "Broadcom BCM2711, Quad core **Cortex-A72** (ARM v8) 64-bit SoC @ 1.5GHz", so the CPU I will give `rustc` is `cortex-a72`.

```shell
RUSTFLAGS="-C target-cpu=cortex-a72" cargo build --release --target armv7-unknown-linux-musleabihf
```

I prefer specifying the `target-cpu` rather than `target-feature` (`RUSTFLAGS="-C target-feature=+v7,+neon"`) because there's less of a chance that I could mess up and accidentally use features that my device doesn't support. However, `target-feature` is another way to access platform-specific features and optimizations. You can read about both options on the [Rust SIMD guide](https://rust-lang.github.io/packed_simd/perf-guide/target-feature/rustflags.html)

Also note that you can specify rust flags (even target specific ones) in your[`Cargo.toml`](https://doc.rust-lang.org/cargo/reference/config.html) file like this

```toml
[build]
# applies to all builds
rustflags = "-C target-cpu=cortex-a72"

[target.armv7-unknown-linux-musleabihf]
# applies to target-specific builds
rustflags = "-C target-cpu=cortex-a72"
```

## Troubleshooting

These are some special cases that encountered. Hopefully, they can help you.

