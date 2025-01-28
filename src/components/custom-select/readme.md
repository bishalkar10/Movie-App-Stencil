# custom-select Component

A reusable dropdown select component built with Stencil.js for internal use. Designed with reusability and flexibility in mind, this component allows for complete customization of its styling. It adheres to best practices by avoiding the use of CSS properties as props and inline styling, ensuring a clean separation of concerns.

The component is configured with `{ shadow: true }`, which scopes its CSS. This guarantees that its styling remains unaffected by external styles, preventing accidental overrides or conflicts.

## Key Features

- **Reusable and Flexible**  
  Designed to be easily integrated into various projects with customizable styling.

- **Encapsulated Styling**  
  Utilizes Shadow DOM to ensure style encapsulation, preventing unintended style conflicts.

- **No Inline Styling**  
  Encourages the use of external stylesheets for better maintainability.

## Props

| Prop Name            | Type           | Default Value        | Mandatory Field | Description                                                                                           |
| -------------------- | -------------- | -------------------- | --------------- | ----------------------------------------------------------------------------------------------------- |
| `options`            | `OptionType[]` | `[]`                 | `Yes`           | Array of options to display in the dropdown.                                                          |
| `placeholder`        | `string`       | `"Select an option"` | `No`            | Placeholder text displayed when no option is selected.                                                |
| `clearSelectionText` | `string`       | `"Clear selection"`  | `No`            | Text displayed for the clear selection option.                                                        |
| `selectedOption`     | `OptionType`   | `undefined`          | `No`            | Pre-selected option. Pass when you wnat the select component to have a field selected by default      |
| `allowClear`         | `boolean`      | `true`               | `No`            | Whether to show the clear selection option. If you want an option to be always selected, pass `false` |
| `onSelectChange`     | `function`     | `undefined`          | `Yes`           | Pass a function to handle the your comoponent logic after selecting an option                         |

---

## Events

| Event Name     | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| `selectChange` | A custom event is emitted when an option is selected or cleared. |

---

## Methods

| Method Name         | Parameters           | Return Type | Description                                                   |
| ------------------- | -------------------- | ----------- | ------------------------------------------------------------- |
| `setSelectedOption` | `option: OptionType` | `void`      | Allows parent component to select an option programmatically. |

### How to use?

1. Create private variable

```
private customSelectRef: HTMLCustomSelectElement;
```

2. Set the variable as ref to the component

<!-- prettier-ignore -->
```jsx
<custom-select 
	id="instance1" 
	exportparts="custom-select" 
	ref={el => (this.customSelectRef = el)} 
	// ...rest of the props 
/>
```

3. Use like this

```typescript
this.customSelectRef.setSelectedOption({ label: '', value: '' });
```

---

## Parts

The `custom-select` component exposes the following CSS parts for styling:

| Part                | HTML Element | Description                                                               |
| ------------------- | ------------ | ------------------------------------------------------------------------- |
| `custom-select`     | `<div>`      | The main container wrapping the entire component.                         |
| `select-button`     | `<button>`   | The button that toggles the dropdown open and closed.                     |
| `selected-value`    | `<span>`     | The text area displaying the selected option's label or placeholder text. |
| `arrow`             | `<span>`     | The dropdown arrow icon.                                                  |
| `dropdown`          | `<ul>`       | The container for the dropdown list of options.                           |
| `option`            | `<li>`       | Each individual option in the dropdown list.                              |
| `clear-option`      | `<li>`       | The option in the dropdown that allows clearing the selection.            |
| `clear-option-text` | `<span>`     | The text inside the clear option.                                         |

---

## Example Usage of parts

You can target these parts using the `::part` pseudo-element in your CSS:

<!-- prettier-ignore -->
```jsx
<custom-select
	id="genre-select"
	exportparts="select-button option"
	options={[
		{ "label": "Horror", "value": "horror" },
		{ "label": "Action", "value": "action" }
	]}
	placeholder="Choose an option"
	selectedOption={{ "label": "Option 1", "value": "1" }}
	allowClear={false}
	onSelectChange={() => console.log("Clicked a option")}
/>
```

```css
/* parent-component.css */
#genre-select::part(select-button) {
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  padding: 8px 12px;
  cursor: pointer;
}

custom-select::part(option):hover {
  background-color: #f0f0f0;
}
```

---

## Example

<!-- prettier-ignore -->
```jsx
<custom-select
	options={[
		{ "label": "Option 1", "value": "1" },
		{ "label": "Option 2", "value": "2" },
	]}
	placeholder="Choose an option"
	onSelectChange={(e) => console.log(e.detail)}
/>
```

<!-- prettier-ignore -->
```jsx
<custom-select
	options={[
		{ "label": "Option 1", "value": "1" },
		{ "label": "Option 2", "value": "2" },
	]}
	placeholder="Choose an option"
	selectedOption={{ "label": "Option 1", "value": "1" }}
	allowClear={false}
	onSelectChange={() => console.log("Clicked a option")} // { "label": "Option 2", "value": "2" }
/>
```

---

> [!NOTE]
> If you are using same component in multiple places and want to style them using `::part` then it's recommended that you pass either some `class` or `id` to the component and then style it just like it is done in HTML, CSS.

> [!NOTE]
> You need to export the parts using components using `exportparts` attribute
