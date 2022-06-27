# @systemlight/typed

> Simulate the animation effect of typing.

### Usage

```html
<div id="typed">
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
    <p></p>
</div>
<script src="./index.js"></script>
<script>
    typedNode('#typed>p:nth-child(1)', 'hello typed-1')
        .then(() => typedNode('#typed>p:nth-child(2)', 'hello typed-2'))
        .then(() => typedNode('#typed>p:nth-child(3)', 'hello typed-3'))
        .then(() => typedNode('#typed>p:nth-child(4)', 'hello typed-4'))
        .then(() => typedNode('#typed>p:nth-child(5)', 'hello typed-5'))
        .then(() => typedNode('#typed>p:nth-child(6)', 'hello typed-6'))
</script>
```
