import { expect } from 'chai';

import { MultipleEjsTemplateService } from './multiple-ejs-template.service';

describe('MultipleEjsTemplateService', () => {

  class ConcreteTemplateService extends MultipleEjsTemplateService {}
  let service: ConcreteTemplateService;

  it('should instantiate.', () => {
    service = new ConcreteTemplateService({
      nowhere: './nowhere.html',
      templateTest: './src/template-test.html'
    });
  });

  describe('when render(locals: ObjectType): string is called', () => {

    it('should reject an Error if no template is registered with the given name.', done => {
      service.render('foo', { name: 'foo' }).catch(() => done());
    });

    it('should reject an Error if the template does not exist.', done => {
      service.render('nowhere', { name: 'foo' }).catch(() => done());
    });

    it('should reject an Error if the template and/or locals are incorrect.', done => {
      service.render('templateTest', {}).catch(() => done());
    });

    it('should render the ejs template with the given locals.', async () => {
      const name = 'Foobar';
      const expected = `Hello ${name}! How are you?`;
      const actual = await service.render('templateTest', { name });
      expect(expected).to.equal(actual);
    });

  });

});
