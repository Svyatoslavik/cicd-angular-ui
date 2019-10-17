import { Params, Data, RouterStateSnapshot } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

export interface IRouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
  fragment: string;
  data: Data;
}

export class RouteSerializer implements RouterStateSerializer<IRouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url } = routerState;

    const { params, fragment, queryParams, data } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams, fragment, data };
  }
}
