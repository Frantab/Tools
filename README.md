# Tools
This project contains library of useful javascript functions. Can be used only for es6+ code.

## Install
```
npm i -D @brandund/tools
```

## Usage
#### 1) Install `@brandund/tools` in your `npm` project.
```
npm i -D @brandund/tools
```

#### 2) Import `Tools` in your code.
```javascript
import * as Tools from '@brandund/tools';
```

### 3) Use tools!
for example:
```javascript
const newElement = Tools.createWholeElement('div', {
    'class': ['class1', 'class2', 'class3'],
    'data-id': '1234'
});
```