/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProfileResponse } from '../../models/profile-response';

export interface GetProfile$Params {
}

export function getProfile(http: HttpClient, rootUrl: string, params?: GetProfile$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfileResponse>> {
  const rb = new RequestBuilder(rootUrl, getProfile.PATH, 'get');
  if (params) {
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProfileResponse>;
    })
  );
}

getProfile.PATH = '/api/v1/profile/';
