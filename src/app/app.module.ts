import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router'
import { WebConsoleComponent, AuthGuard, WebConsoleCoreModule } from 'web-console-core'
import { WebConsoleLoginComponent } from 'web-console-login'
import { ToolBarModule } from '@progress/kendo-angular-toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NGXLogger, NgxLoggerLevel, LoggerModule } from 'ngx-logger';
import { environment } from '../environments/environment';
import { WC_API_BASE_PATH, WC_OAUTH_BASE_PATH } from 'web-console-core'
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { LayoutModule } from '@progress/kendo-angular-layout';

// Motif Web Admin Modules
import { WebAdminModulesProvider } from 'motif-web-admin-core';
import { ConfigurationSectionModule } from 'motif-web-admin-core';
import { OAuth2SectionModule } from 'motif-web-admin-core';
import { SessionsSectionModule } from 'motif-web-admin-core';
import { LicenseManagerSectionModule } from 'motif-web-admin-core';
import { LogSectionModule } from 'motif-web-admin-core';
import { ApplicationContentSectionModule } from 'motif-web-admin-core';
import { PluginsSectionModule } from 'motif-web-admin-core';
import { ServicesSectionModule } from 'motif-web-admin-core';
import { AccessControlSectionModule } from 'motif-web-admin-core';
import { UtilitiesSectionModule } from 'motif-web-admin-core';
import { CountersAndThresholdsSectionModule } from 'motif-web-admin-core';
import { TopMenuComponentModule } from 'motif-web-admin-core';
import { WebContentSectionModule } from 'motif-web-admin-core';
import { WAThemeDesignerModule } from './ThemeDesigner';


const LoggerModuleConfigured = LoggerModule.forRoot({
  level: (environment.production ? NgxLoggerLevel.OFF : NgxLoggerLevel.DEBUG),
  serverLoggingUrl: '/api/logs',
  serverLogLevel: NgxLoggerLevel.OFF
});


const appRoutes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', component: WebConsoleLoginComponent },
  { path: 'dashboard', component: WebConsoleComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    LoggerModuleConfigured,
    WebAdminModulesProvider,
    ToolBarModule,
    BrowserAnimationsModule,
    WebConsoleCoreModule,
    DateInputsModule,
    ConfigurationSectionModule,
    OAuth2SectionModule,
    SessionsSectionModule,
    LicenseManagerSectionModule,
    LogSectionModule,
    ApplicationContentSectionModule,
    PluginsSectionModule,
    ServicesSectionModule,
    AccessControlSectionModule,
    LayoutModule,
    UtilitiesSectionModule,
    CountersAndThresholdsSectionModule,
    TopMenuComponentModule,
    WebContentSectionModule,
    WAThemeDesignerModule
    /*,MemoryLeakSectionModule*/
  ],
  providers: [
    { provide: WC_API_BASE_PATH, useValue: environment.API_BASE_PATH },
    { provide: WC_OAUTH_BASE_PATH, useValue: environment.OAUTH_BAS_PATH },
    WebAdminModulesProvider
  ],
  bootstrap: [ AppComponent ],
  entryComponents: [
  ]
})
export class AppModule {

  constructor(private logger: NGXLogger){
    this.logger.info('AppModule' , 'Starting application');
    this.logger.debug('AppModule' , 'Starting application DEBUG message');
  }

}
