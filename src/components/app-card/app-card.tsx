import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-card',
  styleUrl: 'app-card.css',
})
export class AppCard {
  @Prop() itemId: number;
  @Prop() mediaType: 'person' | 'tv' | 'movie';
  @Prop() name: string;
  @Prop() rating: string | number;
  @Prop() airDate: string;
  @Prop() imageURL: string;

  private baseImgPath = 'https://image.tmdb.org/t/p/w500/';

  render() {
    return (
      <li key={this.itemId} class="app-card-container">
        <div class="image-container">
          <img
            src={`${this.baseImgPath}${this.imageURL}`}
            alt={`Photo of ${this.name}`}
          />
        </div>
        <div class="text-container">
          <span>{this.name}</span>
          {this.mediaType !== 'person' && <span>{this.airDate}</span>}
        </div>
      </li>
    );
  }
}
