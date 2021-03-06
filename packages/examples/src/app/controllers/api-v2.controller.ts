import {
  ApiDefineResponse, ApiDefineTag, ApiInfo, ApiResponse,
  ApiServer, Context, controller, Get, HttpResponseOK
} from '@foal/core';
import { ProductController } from './product.controller';

@ApiInfo({
  license: {
    name: 'foobar',
    url: 'http://foobar.com'
  },
  title: 'Api',
  version: 'v2',
})
@ApiServer({ url: '/api' })
@ApiDefineTag({
  description: 'my tag',
  name: 'tag1',
})
@ApiDefineResponse('SuccessResponse', {
  content: {
    'application/json': {
      example: {
        foo: 1
      }
    }
  },
  description: 'An incredible response',
})
export class ApiV2Controller {

  subControllers = [
    controller('/products', ProductController)
  ];

  @Get('/foo')
  @ApiResponse(200, {
    $ref: '#/components/responses/SuccessResponse'
  })
  foo(ctx: Context) {
    return new HttpResponseOK();
  }

}
