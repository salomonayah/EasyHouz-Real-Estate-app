import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { interceptors } from './auth/interceptors/interceptors.index';
import { AuthState } from './auth/store/auth.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      AuthState
    ]),
    NgxsStoragePluginModule.forRoot({key: 'AuthState'}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    ...interceptors,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// declare interceptors
// register store in localStorage
