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
          <button>search</button>
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
            exportparts="custom-select"
          />
        </form>
      </header>
    );
  }
}
