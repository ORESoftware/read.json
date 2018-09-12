

### @oresoftware/read.json

> A simple alternative to jq for bash/shell
> Reads in JSON to stdin, and always writes JSON to stdout

### installation

> npm i -g @oresoftware/read.json


### Usage

Given a foo.json file like so:

```json 
{
 "foo":{
   "bar": {
     "baz":"biz"
  }
 }
}

```

You can get 'biz' by running:

```bash
$ read_json -k 'foo.bar.baz' < foo.json
```

or equally like so:

```bash
$ read_json -k 'foo.bar.baz' -f  foo.json
```

<br>

To pass an expression to evaluate, use:

```bash
$ read_json --eval "['foo']['bar']['baz']" -f  foo.json
```

note that if you have keys with dots in them, it's necessary to use the `--eval` technique:


```bash
$ read_json --eval "['foo.x.y']" -f  foo.json
```


<br>

As a final example, if you run this:

```bash
$  cat foo.json | read_json
```

You will get this:

```console
{"foo":{"bar":{"baz":"biz"}}}
```
