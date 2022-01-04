---
{{ $name := replace .Name "-" " " -}}
title: Building {{ $name | title | pluralize }}
date: {{ .Date }}
draft: true
tags: [{{ $name }}, shape, product]
categories: [shape]
series: [design]
---

### Unit Price: {{< price "{{ $name | title }}" >}} 

... {{ $name | title }} introduction ...

<!--more-->

... {{ $name | title }} main content ...

Content from [Wikipedia](https://en.wikipedia.org/wiki/{{ $name | title }})