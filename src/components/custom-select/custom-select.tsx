import {
  Component,
  State,
  Prop,
  Event,
  EventEmitter,
  h,
  Method,
} from '@stencil/core';

export interface OptionType {
  label: string;
  value: string | number;
}

@Component({
  tag: 'custom-select',
  styleUrl: 'custom-select.css',
  shadow: true,
})
export class CustomSelect {
  @Prop() options: OptionType[] = [];
  @Prop() placeholder: string = 'Select an option';
  @Prop() clearSelectionText: string = 'Clear selection';
  @Prop() selectedOption: OptionType; // This optional prop is the default option set
  @Prop() allowClear: boolean = true; // while passing selectedOption value always set this value to false

  @State() localOption: OptionType;
  @State() isOpen: boolean = false;
  @Event() selectChange: EventEmitter<OptionType>;

  @Method()
  async setSelectedOption(option: OptionType) {
    this.localOption = option;
  }

  private dropDownElement: HTMLElement;

  toggleDropdown(expand: null | boolean = null) {
    this.isOpen = expand !== null ? expand : !this.isOpen;
  }

  handleOptionSelect(option: OptionType) {
    this.localOption = { ...option };
    this.selectChange.emit(option);
    this.toggleDropdown(false); // close the dropdown after selection;
  }

  componentWillLoad() {
    this.localOption = this.selectedOption; // Initialize the internal state
  }

  // private handleClickOutside = (event: MouseEvent) => {
  //   console.log('outside click');
  //   if (!this.dropDownElement.contains(event.target as Node)) {
  //     this.toggleDropdown(false);
  //   }
  // };

  // componentDidLoad() {
  //   document.addEventListener('click', this.handleClickOutside);
  // }

  // disconnectedCallback() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // }

  render() {
    return (
      <div class="custom-select">
        <button
          class="select-button"
          aria-label="Select button"
          aria-haspopup="listbox"
          role="combobox"
          aria-expanded={this.isOpen.toString()}
          onClick={() => this.toggleDropdown()}
        >
          <span class="selected-value">
            {this.localOption?.label || this.placeholder}
          </span>
          <span class="arrow"></span>
        </button>

        <ul
          ref={el => (this.dropDownElement = el)}
          role="listbox"
          class="select-dropdown"
          hidden={!this.isOpen}
        >
          {this.options.map(option => (
            <li
              role="option"
              onClick={() => this.handleOptionSelect(option)}
              class={this.localOption?.value === option.value ? 'selected' : ''}
            >
              {option.label}
            </li>
          ))}
          {this.allowClear && (
            <li
              role="option"
              data-value="clear"
              onClick={() => this.handleOptionSelect({ label: '', value: '' })}
            >
              <span>{this.clearSelectionText}</span>
            </li>
          )}
        </ul>
      </div>
    );
  }
}
