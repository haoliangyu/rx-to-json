# rx-to-json

![build status](https://travis-ci.org/haoliangyu/rx-to-json.svg?branch=master)

[![ReactiveX](http://reactivex.io/assets/Rx_Logo_S.png)](http://reactivex.io/)

[RxJS 5](http://reactivex.io/) operator to write data into a [JSON](https://en.wikipedia.org/wiki/JSON) file

Work in both JavaScript and TypeScript

## Installation

```
npm install rx-to-json
```

## Use

Import this library and it will add `toJSON` operator to the rxjs `Observable` class.

```
public toJSON(path: string, columns: Array<string>, options?: any): Observable
```

Parameters:

  * **path**: JSON file path
  * **options**: optional configuration for the JSON creation
    * **header**: JSON header. Default: `[`
    * **footer**: JSON footer. Default: `]`

## Example

Generate a JSON file from data flow:

``` javascript
import { Observable } from 'rxjs';
import 'rx-to-json';

let data = [
  { id: 1, name: 'Mike' },
  { id: 2, name: 'Tommy' }
];

Observable.of(...data)
  .toJSON('data.json')
  .subscribe();

// output file:
// [{"id":1,"name":"Mike"},{"id":2,"name":"Tommy"}]

```

Download data from a PostgreSQL dadtabase and save it as a JSON file:

``` javascript
import pgrx from 'pg-reactive';
import 'rx-to-json';

let db = new pgrx('connection string');

db.query('SELECT id, display_name FROM users')
  .map((row) => {
    // convert the data to match column names
    return {
      id: row.id,
      name: row.display_name
    };
  })
  .toJSON('data.json')
  .subscribe();
```

## License

MIT
