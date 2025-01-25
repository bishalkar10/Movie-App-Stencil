import { Component, h, State, Watch } from '@stencil/core';

// import { trendingMovie, trendingPeople } from '../../global/trendingJson';
import {
  discover,
  getTrending,
  TrendingParams,
  MediaType,
} from '../../global/api';
import { DiscoverParams } from '../../global/api';
import { genres } from '../../global/genre';

interface BaseMedia {
  id: number;
  media_type: 'movie' | 'tv' | 'person';
  title?: string; // Title for movies
  original_title?: string;
  adult?: boolean;
  popularity?: number;
  profile_path?: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average?: number;
  vote_count?: number;
  original_language?: string;
  genre_ids?: number[];
  release_date?: string;
  first_air_date?: string;
  name?: string;
  original_name?: string;
  overview?: string;
}

interface Movie extends BaseMedia {
  media_type: 'movie';
  release_date: string;
}

interface TV extends BaseMedia {
  media_type: 'tv';
  first_air_date: string;
}

interface Person extends BaseMedia {
  media_type: 'person';
  known_for_department: string;
  gender: number;
  profile_path: string;
}

type MediaItem = Movie | TV | Person;

@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css',
})
export class AppHome {
  @State() trendingData: MediaItem[];
  @State() discoverData: MediaItem[];
  @State() discoverParams: DiscoverParams = {
    type: 'movie',
    with_genres: '',
  };
  @State() trendingParams: TrendingParams = {
    type: 'movie',
    time_window: 'day',
  };

  @Watch('trendingParams')
  handleTrendingParamsChange() {
    this.fetchTrendingData();
  }

  @Watch('discoverParams')
  handleDiscoverParamsChange() {
    this.fetchDiscoverData();
  }

  private customSelectRef: HTMLCustomSelectElement;

  private fetchTrendingData() {
    getTrending(this.trendingParams).then(
      data => (this.trendingData = data.results),
    );
  }

  private fetchDiscoverData() {
    discover(this.discoverParams).then(
      data => (this.discoverData = data.results),
    );
  }

  private updateTrendingParams(key: keyof TrendingParams, value: string) {
    this.trendingParams = { ...this.trendingParams, [key]: value };
  }

  private updateDiscoverParams(key: keyof DiscoverParams, value: string) {
    if (key === 'type') {
      const isValidGenre = this.getFilteredGenres(value as MediaType).some(
        ([_, genreId]) =>
          genreId.toString() === this.discoverParams.with_genres,
      );

      if (!isValidGenre) {
        this.discoverParams = {
          ...this.discoverParams,
          [key]: value as MediaType,
          with_genres: '',
        };
        this.customSelectRef.setSelectedOption({ label: '', value: '' });
        return;
      }
    }

    this.discoverParams = { ...this.discoverParams, [key]: value };
  }

  private getFilteredGenres(type: 'movie' | 'tv') {
    return Object.entries(genres).filter(([key]) => {
      if (type === 'movie') {
        return key !== 'Action & Adventure'; // Remove "Action & Adventure" for movies
      } else if (type === 'tv') {
        return key !== 'Action' && key !== 'Adventure'; // Remove "Action" and "Adventure" for TV
      }
      return true;
    });
  }

  componentWillLoad() {
    this.fetchDiscoverData();
    this.fetchTrendingData();
  }

  render() {
    const filteredGenres = this.getFilteredGenres(this.discoverParams.type);

    return (
      <div class="app-home">
        <section class="home-trending-section">
          <div class="section-header">
            Trending
            <div class="options-container">
              <custom-select
                options={[
                  { label: 'All', value: 'all' },
                  { label: 'Movie', value: 'movie' },
                  { label: 'TV', value: 'tv' },
                  { label: 'Person', value: 'person' },
                ]}
                selectedOption={{ label: 'Movie', value: 'movie' }}
                allowClear={false}
                onSelectChange={e =>
                  this.updateTrendingParams('type', e.detail.value as string)
                }
              />
              <custom-select
                options={[
                  { label: 'Day', value: 'day' },
                  { label: 'Week', value: 'week' },
                ]}
                selectedOption={{ label: 'Day', value: 'day' }}
                allowClear={false} // This select field must have one value so we shouldn't clear it
                onSelectChange={e =>
                  this.updateTrendingParams(
                    'time_window',
                    e.detail.value as string,
                  )
                }
              />
            </div>
          </div>
          <ul>
            {this.trendingData?.map(item => {
              return (
                <app-card
                  key={item.id}
                  mediaType={item.media_type} // Type assertion
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
        </section>
        <section class="home-discover-section">
          <div class="section-header">
            Discover
            <div class="options-container">
              <custom-select
                options={[
                  { label: 'Movie', value: 'movie' },
                  { label: 'TV', value: 'tv' },
                ]}
                selectedOption={{ label: 'Movie', value: 'movie' }}
                allowClear={false}
                onSelectChange={e =>
                  this.updateDiscoverParams('type', e.detail.value as string)
                }
              />

              <custom-select
                ref={el => (this.customSelectRef = el)}
                placeholder="Select a Genre"
                options={filteredGenres?.map(([key, value]) => ({
                  label: key,
                  value: value,
                }))}
                onSelectChange={e =>
                  this.updateDiscoverParams(
                    'with_genres',
                    e.detail.value as string,
                  )
                }
              />
            </div>
          </div>
          <ul>
            {this.discoverData?.map(item => {
              return (
                <app-card
                  itemId={item.id}
                  mediaType={item.media_type} // Type assertion
                  name={
                    item.title ||
                    item.original_title ||
                    item.name ||
                    item.original_name
                  }
                  rating={item.vote_average}
                  airDate={item.release_date || item.first_air_date}
                  imageURL={`https://image.tmdb.org/t/p/w500${
                    item.poster_path || item.profile_path
                  }`}
                />
              );
            })}
          </ul>
        </section>
      </div>
    );
  }
}
