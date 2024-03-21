---
title: JSON
order: 19
group:
  title: JS 基础
  order: -1
---

# JSON

JSON 是语言无关的纯数据规范，因此一些特定于 JavaScript 的对象属性会被 JSON.stringify 跳过。

即：

- 函数属性 (方法)。
- Symbol 类型的键和值。
- 存储 `undefined` 的属性。

```js
let user = {
  sayHi() {
    // 被忽略
    alert('Hello')
  },
  [Symbol('id')]: 123, // 被忽略
  something: undefined, // 被忽略
}

alert(JSON.stringify(user)) // {}（空对象
```

重要的限制：不得有循环引用。

```js
let room = {
  number: 23,
}

let meetup = {
  title: 'Conference',
  participants: ['john', 'ann'],
}

meetup.place = room // meetup 引用了 room
room.occupiedBy = meetup // room 引用了 meetup

JSON.stringify(meetup) // Error: Converting circular structure to JSON
```

JSON.stringify 的完整语法是：`let json = JSON.stringify(value[, replacer, space])`

```js
// 去除导致循环引用的 room.occupiedBy
let room = {
  number: 23,
}

let meetup = {
  title: 'Conference',
  participants: [{ name: 'John' }, { name: 'Alice' }],
  place: room, // meetup 引用了 room
}

room.occupiedBy = meetup // room 引用了 meetup

alert(
  JSON.stringify(meetup, function replacer(key, value) {
    return key == 'occupiedBy' ? undefined : value
  }),
)

/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/
```
