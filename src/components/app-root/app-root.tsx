import { Component, h } from '@stencil/core';
import { Router } from '../../';
import { match, Route } from 'stencil-router-v2';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <div>
        <app-header />
        <main>
          <Router.Switch>
            <Route path="/">
              <app-home />
            </Route>
            <Route
              path={match('/:type/query=:query')}
              render={({ type, query }) => (
                <search-results type={type} query={query} />
              )}
            />
          </Router.Switch>
        </main>
      </div>
    );
  }
}
