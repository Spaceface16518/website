---
title: Either in Rust
description: |
  Everyone knows about Option and Result, but the lesser-known Either is also a useful and powerful enumeration.
  Let's explore what you can do with it and why it works the way it does.

date: 2020-07-26T21:18:10-05:00
draft: false
toc: false
images:
categories:
    - Development
    - Code
tags:
    - development
    - rust
    - either
---

## Background

While developing a command-line application, I found myself needing to send output to either a file or standard output based on a user-provided flag. In an OOP language like Python or Java, I could easily use polymorphism and inheritance to use the proper output, assuming both modes of output descended from the same class. In Rust, however, I couldn't (or at least didn't want to) use dynamic techniques like this. Despite being experienced with functional programming (for my age and skill level), it was then that I discovered the `Either` type.

## Advantages

`Either` is a Rust `enum`, similar to `Option` and `Result` (more so the latter). It's purpose is self-explanatory: it's a general purpose wrapper type that can represent *either* one type or another. On it's own, it is already useful, but its interaction with the Rust type system is what makes `Either` much more powerful than it seems.

Take my use-case for example. I needed to store a value that could be *either* a file *or* standard output. Using `Either`,  I could construct the value based on the user-provided flag.

```rust
let output: Either<File, Stdout> = if let Some(path) = file_flag {
  Either::Left(File::open(path))
} else {
  Either::Right(stdout())
}
```

This value, `output`, is already useful. I can deconstruct it to write to correct place.

```rust
match output {
  Either::Left(file) => file.write(content),
  Either::Right(stdout) => stdout.write(content)
}
```

Notice we use the `write` method on both the `File` and `Stdout`; a method that comes from the `std::io::Write` trait. This leads us to an important observation: **since both `File` and `Stdout` implement `Write`, we can pretend like the wrapper type implements `Write` as well, since no matter what is inside the `Either`, we can write to it.**

We can generalize this conclusion using type parameters. `Either`'s full signature is `Either<L, R>`. The `L` and `R` are stand-in's for actual types. If both types implement `Write` (`L: Write, R: Write`), so does `Either`.

So what would this implementation actually  look like? After generalizing the types in the specific example above, we can also generalize the implementation.

```rust
impl<L: Write, R: Write> Write for Either<L, R> {
  fn write(&mut self, buf: &[u8]) -> Result<usize> {
    match self {
      Either::Left(left) => left.write(buf),
      Either::Right(right) => right.write(buf)
    }
  }
  
  // `flush` implementation would be the same,
  // but with `.flush()` instead of `.write(buf)`
}
```

This logic can be extended to other traits as well, such as `Read`, `Display`, `PartialEq`, `Clone`, and any other trait that can apply if both inner types implement the traits as well. It can also apply to traits with type parameters like `AsMut<str>` or `AsRef<Path>` and traits with associated types like `Deref` where both `R` and `L` dereference to the same `Target`.

## Limitations

Since we generalized an example with concrete types into one variable types constrained by traits, can we generalize the example with variable types into one with variable **traits** constrained by their behavior? Unfortunately, not with Rust.

First let's think about how this would look in Rust.

```rust
// AnyTrait is a (made-up) "trait variable"
impl<L: AnyTrait, R: AnyTrait> AnyTrait for Either<L, R> {}
```

Now how would we tell Rust how to delegate method calls? Specifying a type parameter allows us to put any type in its place, but how could we use any trait in place of a "trait variable"—there's no way we implement every method of every single trait.

Besides, not every trait acts the same way. We could implement simple traits like `Read`  and `Write`, but what about traits like `Iterator`? It would have to be implemented differently because the `Type` of the iterator would depend on which type is inside the `Either`.

```rust
impl<L: Iterator, R: Iterator> Iterator for Either<L, R> {
  type Item = Either<L::Item, R::Item>;
  
  // ...
}
```

This implementation wouldn't be transparent—we could no longer treat `Either` as a see-through container because it would change the type of the iterator.
