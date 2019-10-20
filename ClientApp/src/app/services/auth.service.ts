import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError, ReplaySubject } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "tan-vu.eu.auth0.com",
      client_id: "33uvkXriUTHimgEFo9wx4HwWJKfSipS5",
      redirect_uri: `${window.location.origin}/callback`,
      audience: "https://api.vega.com"
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
 
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new ReplaySubject<any>(null);
  private userProfile$ = this.userProfileSubject$.asObservable();
  private profile: any = null;

  private rolesSubject$ = new ReplaySubject<any>(null);
  private roles: string[] = [];
  public roles$ = this.rolesSubject$.asObservable();

  // Create a local property for login status
  public loggedIn: boolean = null;
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable  
  public isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );  
  
  constructor(private router: Router) { }

  public isInRole(roleName) {
    return this.roles.indexOf(roleName) > -1;
  }

  public login(redirectPath: string = '/') {
    // A desired redirect path can be passed to login method
    // (e.g., from a route guard)
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log in
      client.loginWithRedirect({
        redirect_uri: `${window.location.origin}/callback`,
        appState: { target: redirectPath }
      });
    });
  }

  public handleAuthCallback() {
    // Only the callback component should call this method
    // Call when app reloads after user logs in with Auth0
    let targetRoute: string; // Path to redirect to after login processsed
    const authComplete$ = this.handleRedirectCallback$.pipe(
      // Have client, now call method to handle auth callback redirect
      tap(cbRes => {
        // Get and set target redirect route from callback results
        targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
      }),
      concatMap(() => {
        // Redirect callback complete; get user and login status
        return combineLatest(
          this.getUser$(),
          this.isAuthenticated$
        );
      })
    );
    // Subscribe to authentication completion observable
    // Response will be an array of user and login status
    authComplete$.subscribe(([user, loggedIn]) => {
      // Redirect to target route after callback processing
      this.router.navigate([targetRoute]);
    });
  }

  public logout() {
    // Ensure Auth0 client instance exists
    this.auth0Client$.subscribe((client: Auth0Client) => {
      // Call method to log out
      client.logout({
        client_id: "33uvkXriUTHimgEFo9wx4HwWJKfSipS5",
        returnTo: `${window.location.origin}`
      });
    });
  }

  public localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        else {
          this.userProfileSubject$.next(null);
          // If not authenticated, return stream that emits 'false'
          return of(loggedIn);
        }
      })
    );
    checkAuth$.subscribe((response: { [key: string]: any } | boolean) => {
      // If authenticated, response will be user object
      // If not authenticated, response will be 'false'
      this.loggedIn = !!response;
    });

    this.userProfile$.subscribe((profile: any) => {
      this.profile = profile;
      if (this.profile) {
        this.roles = this.profile["https://vega.com/roles"];
      }
      else {
        this.roles = [];
      }
      
      console.log(this.roles);
      this.rolesSubject$.next(this.roles);
    });
  }

  public getToken() {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(
        client.getTokenSilently().catch(error => {
          console.log("getTokenSilently error: " + JSON.stringify(error));
          throw error;
        })
      ))
    );
  }

  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  private getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }    
}