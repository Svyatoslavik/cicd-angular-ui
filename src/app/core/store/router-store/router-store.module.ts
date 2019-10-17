import { NgModule } from '@angular/core';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { RouteSerializer } from './route-serializer';
import { StoreModule } from '@ngrx/store';
import { FEATURE_ROUTER } from './const';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(FEATURE_ROUTER, routerReducer),
    // StoreRouterConnectingModule.forRoot({
    //   // stateKey: FEATURE_ROUTER,
    //   serializer: RouteSerializer,
    //   routerState: 1
    // }),
  ]
})
export class RouterStoreModule { }
