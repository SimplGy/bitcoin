# Maybe.


There are three general views. I don't know how many data stuctures there should be.

Views:

* Overview/calendar of the days. All of the days in bitcoin's history
* Detail of one week. Show all blocks for the week, but they'll prolly be small
* Detail of one day.

## Facts

There is one block every 10 minutes, on average.

This means there are:

* 6 blocks per hour
* 144 blocks per day
* 52560 blocks per year

For the forseeable future there will be less than 1,000,000 blocks.


## Calendar

Represented by `calendar.model`.

```js
{
  totalDays:  2309 // so far
  totalWeeks: 331
  days: [
    // A slim instance of `day.model` without the `blocks` filled in.
    {
      date: '2015-04-29'
      totalBtc: 34.2342323
      totalTransactions: 23984
    }
    { ... }
    { ... }
  ]
}
```

## Week

Visualization is the week, including some representation of every single block. Just an array of 7 or fewer full instances of `day.model`.

```js
Days.getWeek '2015-04-29' // returns the week which contains this day
[
  { ... }
  { ... }
  { ... }
  { ... }
  { ... }
  { ... }
  { ... }
]
```

## Day Summary

`day-summary.model`. Depends on `day.model`

## Day

Represented by `day.model`.
Visualization should be the detail of all the blocks for a single day.
The day of week and date are important to show.
Maybe some averages for the day.
A day has about `144` blocks.

```js
Days.get
{
  date: '2015-04-29'
  totalBtc: 34.2342323
  totalTransactions: 23984
  avgByteSize: 390000        // how close to capacity are the blocks in this day?
  complete: true             // Does it have all the blocks confirmed? Are there future days confirmed as well?
  blocks: [
    { ... }
    { ... }
    { ... }
  ]
}
```

## Blocks

`blocks.collection`

```js
Blocks.get '2015-04-29' // Get all the blocks available for this day. Returns from cache or fetches new ones as necessary
[
  // A block from the API, raw
  {
    hash: ''
    block_time''
    transactions: 42
  }
  { ... }
]
```