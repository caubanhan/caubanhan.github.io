---
layout: ../../layouts/Project.astro
order: 1
title: PDFinder
status: active
year: 2026
lede: Finds a PDF by what it says, not by what someone named it.
stats:
  - { n: "0", label: "network calls" }
links:
  - { label: "source", href: "https://github.com/caubanhan/PDFinder" }
---

## Problem

A folder of lecture notes, manuals and scans, half of them called `scan_014.pdf`. You
remember the idea you are looking for, never the filename.

Filename search only finds what someone bothered to name well. `grep` does not read PDFs
at all. So the documents are on your own disk and still effectively unsearchable.

## Approach

Extract the text, split it into chunks, embed each chunk with sentence-transformers, and
store the vectors in a FAISS index. A query gets embedded the same way; FAISS returns the
nearest chunks and a metadata file maps them back to the file they came from.

One command, from any directory:

```bash
pdfinder "database normalization examples"
pdfinder "operating systems deadlock prevention"
```

Neither of those strings has to appear in the document. Close enough in meaning is enough.

> **Rejected: a hosted embedding API.** Faster to build and better at ranking. But it
> means every document you own is uploaded to somebody else's machine to be read. These
> are personal notes and coursework. The whole index runs offline instead — no key, no
> account, nothing leaves the disk. Worse rankings are a price worth paying; the alternative
> is a search tool you cannot point at anything private, which is most of what is worth searching.

## Result

Semantic search across a folder of PDFs, entirely local, driven from the terminal.

<!-- TODO: viết bằng lời của bạn — bao nhiêu tài liệu đã đánh chỉ mục,
     tìm mất bao lâu, cái gì vẫn còn dở -->

Currently Linux only, and the index is rebuilt in full rather than updated when a file
is added — fine at the size I use it, and the first thing to fix if it grows.
