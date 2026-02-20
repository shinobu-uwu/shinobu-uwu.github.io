# Yet Another Rust OS

## Introduction

Hello, world! In this series of posts, we'll be building an operating system
kernel from scratch in Rust. Along the way we will explore how kernels manage
memory, schedule processes, and interact with hardware.

This isn't meant to be a full-blown production OS, far from it, but rather an entry point for you learning journey in the
OSDev world. We'll have the chance to understand the fundamentals of how operating systems work under the hood, and how Rust's
safety and expressiveness can help us in such domain.

## Why does this exist?

The main reason I'm writing this series of blog posts is simple: there isn't much beginner-friendly content to for getting started in the OSDev world. Sure,
there are few tutorials here and there, and [OSDev wiki](https://wiki.osdev.org/Expanded_Main_Page) is a life saver, but most of them either stop too
early in the development of a kernel or focus on abstract concepts with scattered snippets of code. While that might be enough for someone already 
somewhat experienced in low-level programming, it's nowhere near enough for a complete beginner.

## Why Rust?

Rust is a great fit for operating system development because it combines high-level abstractions,
memory safety, and a powerful type system, without sacrificing performance.
While it’s impossible to write a kernel without touching unsafe code, Rust lets us isolate those parts.
We can wrap the unsafe building blocks in safe abstractions, so the majority of our kernel remains safe, expressive, and less error-prone.

## What about "Writing an OS in Rust"?

Those blog posts are great, and they helped me **a lot** when I first got into OSDev while writing the OS for my graduation thesis.
But they are outdated (a third edition is in the works, but only a few posts are available so far, and only in their github), incomplete,
and include some design decisions I personally don't agree with, such as:

- Using the `x86_64` crate: while it simplifies the early stages of development, the extra indirection it
introduces over things that you often need fine control of isn’t worth it in my opinion.
I used it during my thesis, but eventually regretted it.
- Using the `bootloader` crate: this isn't really a problema with `bootloader` itself, it's just that the
[Limine bootloader](https://github.com/limine-bootloader/limine) is simply too good to pass up.

That said, I don’t want anyone to think I dislike those posts. They’re awesome, and I will recommend you read some of them during the course of these posts!

## Prerequisites

In this series we will start from the beginning of OSDev. That said, OSDev - especially kernel development - is not easy.
To get the most out of these posts, you should already have some familiarity with:

- How computers work under the hood (things like memory, CPUs, and I/O)
- Common data structures and algorithms
- A basic understand of Rust, since that's the language we'll be using

## Initial setup

For this project we will start with a template, but don't worry we will go through it step by step.

The template we will use is the [Limine Rust template](https://github.com/limine-bootloader/limine-c-template), which is a fork of the
official C template maintained by the Limine team. I recommend cloning the repository, deleting the .git directory, and then running `git init`
to have a fresh repository to work with.

Now you might be wondering: why Limine? Why not the famously known GRUB, or systemd-boot? Limine is a modern,
actively maintained bootloader designed with flexibility and simplicity in mind. It supports both BIOS and UEFI, has a clean specification,
and makes it straightforward to load your kernel without locking you into heavy abstractions.
Limine is fast, lightweight, and doesn’t try to hide too much of the low-level details.

This template comes with a pre-configured Makefile, which allows us to compile the kernel and run it in a VM with just one command.
For that, you will need to have [QEMU](https://www.qemu.org/) and the `make` and `xorriso` package installed in your system. Check your package manager
repositories for that. With the dependencies in place, let’s dig into the code.

In the root of the repository you will see a few files:

- `GNUMakefile`: what we will be read by `make` to build our project. Inside it you will see a few rules, they don't
really matter now, all it does it is compiling and generating an ISO to be used to boot our kernel.
- `LICENSE`: license of the project, not relevant for us right now
- `limine.conf` the configuration of limine, you can go check [the full spec here](https://github.com/limine-bootloader/limine/blob/v9.x/CONFIG.md).
For now, the only change worth making is setting timeout to 0 so our kernel boots instantly.
- `kernel/`: everything related to the kernel itself. Inside this directory you'll see:
    - `src` is where our kernel code will live
    - `linker-scripts`, those scripts are used by the compiler to generate our binary, what it does is:
        - `OUTPUT_FORMAT(elf64-x86-64)`: tells the linker to produce a 64-bit ELF file for the x86_64 architecture
        - `ENTRY(kmain)`: signals that the function kmain is the entry-point of our application, once the bootloader
        hands over control back to us, this is the function that will be called
        - `PHDRS`: program headers, they define the segments that the bootloader will load into memory. They are part of the
        [ELF](https://wiki.osdev.org/ELF) spec
        - `. = 0xffffffff80000000;`: this sets the starting address of our kernel. Limine will place the kernel in the higher half
        of the address space (the top 2GiB). You can read more about it in the [OSDev Wiki](https://wiki.osdev.org/Higher_Half_Kernel)
        - `. = ALIGN(CONSTANT(MAXPAGESIZE));`: ensures that sections start on clean memory pages, we will talk about paging soon enough
        - `/DISCARD/`: discards debug/metadata sections produced by the compiler, they are not needed in a kernel

Now we can run our kernel with the command `make run`. The first build will take a little longer since it needs
to download some dependencies, but later builds will be much faster.
If everything worked, you should now see a gorgeous black screen with a single
white line on it 🎉.

![Black screen with a white line on it](/posts/osdev/images/1-intro/1.png)

You might also notice that the root directory now contains a bunch of new files
and folders. Don’t worry, these are just build artifacts generated during compilation.
They’re already listed in the `.gitignore` file, so you don’t need to commit
them to your repository.

## Conclusion

That's it for now, folks! Now we have a working setup that we can build upon in later chapters. Tune in for the next one!
