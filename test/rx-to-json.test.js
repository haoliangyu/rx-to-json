import chai from 'chai';
import { join } from 'path';
import { Observable } from 'rxjs';
import { existsSync, unlinkSync, readFileSync } from 'fs';
import '../src/rx-to-json';

const expect = chai.expect;
const testJSON = join(__dirname, 'write.test.json');
const noop = () => {};

describe('toCSV()', () => {

  afterEach(() => {
    cleanup();
  });

  it('should generate a JSON file.', (done) => {
    let data = [
      { id: 1, name: 'Mike' },
      { id: 2, name: 'Tommy' }
    ];
    let jsonString = '[{"id":1,"name":"Mike"},{"id":2,"name":"Tommy"}]';

    Observable.of(...data)
      .toJSON(testJSON)
      .subscribe(noop, noop, () => {
        let json = readFileSync(testJSON, 'utf8');
        expect(json).to.equal(jsonString);
        done();
      });
  });

  it('should generate a JSON file with custom header and footer.', (done) => {
    let data = [
      { id: 1, name: 'Mike' },
      { id: 2, name: 'Tommy' }
    ];
    let jsonString = '{"data":[{"id":1,"name":"Mike"},{"id":2,"name":"Tommy"}]}';
    let options = {
      header: '{"data":[',
      footer: ']}'
    };

    Observable.of(...data)
      .toJSON(testJSON, options)
      .subscribe(noop, noop, () => {
        let json = readFileSync(testJSON, 'utf8');
        expect(json).to.equal(jsonString);
        done();
      });
  });

});

function cleanup() {
  if (existsSync(testJSON)) {
    unlinkSync(testJSON);
  }
}
