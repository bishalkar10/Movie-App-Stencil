import { Component, h } from '@stencil/core';
import { Router } from '../../';
import { Route, match } from 'stencil-router-v2';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  render() {
    return (
      <div>
        <header>
          <h1 onClick={() => Router.push('/')}>Movie Gallery</h1>
          <div>
            <input placeholder="Search" />
            <label>
              <select id="category-select" name="category" aria-label="Category">
                <option value="all">All</option>
                <option value="movie">Movie</option>
                <option value="tv">TV</option>
                <option value="person">Person</option>
              </select>
            </label>
          </div>
        </header>

        <main>
          <Router.Switch>
            <Route path="/">
              <app-home />
            </Route>
            <Route path={match('/profile/:name')} render={({ name }) => <app-profile name={name} />} />
          </Router.Switch>
        </main>
      </div>
    );
  }
}
