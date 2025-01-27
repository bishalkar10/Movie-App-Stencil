import { Component, h, State, Prop, Watch } from '@stencil/core';
import { search, SearchParams } from '../../global/api';
import { MediaItem } from '../app-home/app-home';

@Component({
  tag: 'search-results',
  styleUrl: 'search-results.css',
  shadow: true,
})
export class AppSearchResults {
  @State() searchResults: MediaItem[];
  @State() isLoading: boolean = false;
  @State() error: string = null;

  @Prop() type: any;
  @Prop() query: string;

  componentWillLoad() {
    this.fetchSearchResults(); // Uncomment this line
  }

  @Watch('type')
  @Watch('query')
  watchTypeAndQuery() {
    this.fetchSearchResults();
  }

  async fetchSearchResults() {
    if (!this.query) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    try {
      const params: SearchParams = {
        type: this.type,
        query: this.query,
      };

      const data = await search(params);
      this.searchResults = data.results;
    } catch (err) {
      this.error = 'Failed to fetch search results.';
    } finally {
      this.isLoading = false;
    }
  }

  render() {
    return (
      <div class="search-results">
        {this.isLoading && <p>Loading...</p>}
        {this.error && <p class="error">{this.error}</p>}
        {!this.isLoading && !this.error && (
          <ul class="results-grid">
            {this.searchResults?.map(item => {
              return (
                <search-result-card
                  key={item.id}
                  mediaType={item.media_type}
                  name={
                    item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name
                  }
                  rating={item.vote_average}
                  airDate={item.release_date || item.first_air_date}
                  imageURL={item.poster_path || item.profile_path}
                />
              );
            })}
          </ul>
        )}
      </div>
    );
  }
}
