---
{{ $name := replace .Name "-" " " -}}
title: Building {{ $name | title | pluralize }}
date: {{ .Date }}
draft: false
tags: [{{ $name }}, shape, product]
categories: [shape]
series: [design]
---

... {{ $name | title }} introduction ...

<!--more-->

... {{ $name | title }} main content ...

## Price

{{< price "{{ $name | title }}" >}} 


Content from [Wikipedia](https://en.wikipedia.org/wiki/{{ $name | title }})