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
          <form>
            <input placeholder="Search" />
            <button>search</button>
            <custom-select
              options={[
                { label: 'All', value: 'all' },
                { label: 'Movie', value: 'movie' },
                { label: 'TV', value: 'tv' },
                { label: 'Person', value: 'person' },
              ]}
              selectedOption={{ label: 'Movie', value: 'movie' }}
              allowClear={false}
              onSelectChange={() => console.log('nothing happend - Zoro')}
            />
          </form>
        </header>

        <main>
          <Router.Switch>
            <Route path="/">
              <app-home />
            </Route>
            <Route
              path={match('/profile/:name')}
              render={({ name }) => <app-profile name={name} />}
            />
          </Router.Switch>
        </main>
      </div>
    );
  }
}
