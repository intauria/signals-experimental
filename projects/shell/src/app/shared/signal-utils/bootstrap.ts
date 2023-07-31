import { ApplicationConfig, ApplicationRef, DoBootstrap, EnvironmentProviders, NgModule, Provider, Type } from "@angular/core";
import { BrowserModule, platformBrowser } from "@angular/platform-browser";
import { provideRouterChangeDetectionTrigger } from "./change-detection";


function bootstrapStandaloneAsModule(
  comp: Type<unknown>,
  providers: Array<Provider | EnvironmentProviders> = []
): Type<unknown> {
  @NgModule({
    imports: [BrowserModule],
    providers: [
      ...providers,
      provideRouterChangeDetectionTrigger()
    ]
  })
  class RootModule implements DoBootstrap {
    ngDoBootstrap(appRef: ApplicationRef) {
      appRef.bootstrap(comp);
    }
  };

  return RootModule;
}

export async function bootstrapSignalApplication(
  rootComponent: Type<unknown>,
  options?: ApplicationConfig
): Promise<ApplicationRef> {

  const module = await platformBrowser().bootstrapModule(
    bootstrapStandaloneAsModule(
      rootComponent,
      options?.providers
    ),
    { ngZone: 'noop' }
  );

  return module.injector.get(ApplicationRef);
}
