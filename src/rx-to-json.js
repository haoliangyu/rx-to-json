import { Observable } from 'rxjs';
import { dirname } from 'path';
import { createWriteStream, ensureDirSync } from 'fs-extra';
import defaults from 'lodash.defaults';

const defaultCSVOptions = {
  header: '[',
  footer: ']'
};

function toJSON(path, options = {}) {

  options = defaults(options, defaultCSVOptions);

  return Observable.create((subscriber) => {
    let source = this;

    // make sure that the directory exists.
    ensureDirSync(dirname(path));

    let notFirst = false;
    let stream = createWriteStream(path);
    stream.write(options.header);

    stream.on('finish', () => subscriber.complete());
    stream.on('error', (err) => subscriber.error(err));

    let subscription = source.subscribe((value) => {
      try {
        if (notFirst) {
          stream.write(',');
        } else {
          notFirst = true;
        }

        stream.write(JSON.stringify(value));
        subscriber.next();
      } catch(err) {
        subscriber.error(err);
      }
    },
    (err) => {
      stream.end();
      subscriber.error(err);
    },
    () => {
      stream.write(options.footer);
      stream.end();
    });

    return subscription;
  });
}

Observable.prototype.toJSON = toJSON;
