import { Component, h, State } from '@stencil/core';
import { Router } from '../../';
import { SearchParams } from '../../global/api';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css',
  shadow: true,
})
export class AppHeader {
  @State() searchParams: SearchParams = {
    type: 'multi',
    query: '',
  };

  private searchContent(e: Event) {
    e.preventDefault();

    if (this.searchParams.query.trim() === '') return;

    Router.push(`/${this.searchParams.type}/query=${this.searchParams.query}`);
  }

  private updateSearchParams(key: keyof SearchParams, value: string) {
    this.searchParams = { ...this.searchParams, [key]: value };
  }

  render() {
    return (
      <header>
        <h1 onClick={() => Router.push('/')}>Movie Gallery</h1>
        <form onSubmit={e => this.searchContent(e)}>
          <input
            placeholder="Search"
            onInput={e => {
              this.updateSearchParams(
                'query',
                (e.target as HTMLInputElement).value,
              );
            }}
          />
          <button class="search-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </button>
          <custom-select
            options={[
              { label: 'All', value: 'multi' },
              { label: 'Movie', value: 'movie' },
              { label: 'TV', value: 'tv' },
              { label: 'Person', value: 'person' },
            ]}
            selectedOption={{ label: 'All', value: 'multi' }}
            allowClear={false}
            onSelectChange={e =>
              this.updateSearchParams('query', e.detail.value as string)
            }
          />
        </form>
      </header>
    );
  }
}
