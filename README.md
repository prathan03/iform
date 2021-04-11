# iForm-zt

iForm-zt is a Vue Component for zt-dev Depertment.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install iForm-zt.


###### install lib
```npm
npm i vue-cleave
npm i vue-sweetalert2
npm i vee-validate
npm i vue-multiselect
npm install vue-loading-overlay --save
npm i vue-instant-pdf-viewer
```
###### install iForm-zt
```npm
npm i iform-zt

```

## Usage

```javascript
import { iSelect } from 'iform-zt';

export default {
components:{ 
     iSelect,
  },
}
```
## Example
#### iTextbox Component

```html
 <iTextbox iStore="Data" iKey="name" iRequire="required" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |
iType| hidden,readonly|
iEng| true |

#### iTextarea Component

```html
 <iTextarea iStore="Data" iKey="name" iRows="5" iCols="100" iRequire="required" iType="readonly" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iRows| number of rows|
iCols| number of column|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |
iType| 'readonly'|

#### iDate Component

```html
 <iDate iStore="Data" iKey="date" iMin="2017-05-30" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iType| readonly, ''|
iMin| (ISO 8601 format) Ex. 2017-05-30|
iMax| (ISO 8601 format) Ex. 2019-01-25|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |

#### iCheckBox Component

```html
 <iCheckBox iStore="Data" iKey="checkBox"  iDisplay="ตัวเลือก" iRequire="required" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iDisplay| label string in checkBox|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |

#### iUpload Component

```html
 <iUpload iStore="Data" iKey="uploadFile"  iLink="/api/demo/uploadfile" iRequire="image" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iLink| link for upload data in api|
iRequire| 'true' or 'false' |

#### iSelect Component

```html
 <iSelect  
     iStore="Data"
     iKey="province" 
     iVal="name" 
     iDisplay="name" 
     iType="link" 
     iData="/api/provinces"
     iRequire="required"
  />
```

#### iAutocomplete Component

```html
 <iAutocomplete  
     iStore="Data"
     iKey="province" 
     iVal="name" 
     iDisplay="name" 
     iType="link" 
     iData="/api/provinces"
     iRequire="required"
  />
```
Attribute| Description|
--- | --- |
iDisabled| true' or 'false'|
v-on:onChangeValue="OnChangeFunction"| onChangeValue is emit event return value on-change to "OnChangeFunction"|

###### use array data
```html
 <iSelect  
     iStore="Data"
     iKey="province" 
     iVal="name"
     iDisplay="name" 
     iType="array" 
     :iData="obj"
     iRequire="required"
  />

  <script>
export default {
    ...

    data(){
      return{
        obj:[
          {name:'A'},
          {name:'B'},
          {name:'C'}
        ]
      }
    }
    
    ...
}
</script>

```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iVal| keyname binding value in option select |
iDisplay| keyname binding label in option select|
iType| link: path web api ,or array: data array |
iData| '/api/demo/' or array[ ] |
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |


#### iNumber Component

```html
<iNumber iStore="Data" iKey="number" ></iNumber>
//1234567879

<iNumber iStore="Data" iKey="number" iType="number" ></iNumber>
//1234567879

<iNumber iStore="Data" iKey="integer" iType="integer" ></iNumber>
//1,234,567

<iNumber iStore="Data" iKey="integermoney" iType="integermoney" ></iNumber>
//$ 1,234,567

<iNumber iStore="Data" iKey="decimal" iType="decimal" ></iNumber>
//1234567.89

<iNumber iStore="Data" iKey="decimalmoney" iType="decimalmoney" ></iNumber>
//$ 1,234,567.89

<iNumber iStore="Data" iKey="cellphone" iType="cellphone" ></iNumber>
//display: 08-9999-9999 value: 08999999999

<iNumber iStore="Data" iKey="homephone" iType="homephone" ></iNumber>
//display: 0-2222-2222 value: 022222222

<iNumber iStore="Data" iKey="homephone" iType="creditcard" ></iNumber>
//display: xxxx-xxxx-xxxx-xxxx value: 0000000000000000

<iNumber iStore="Data" iKey="homephone" iType="idcard" ></iNumber>
//display: x-xxxx-xxxxxx-xx-x value: 0000000000000
```
```html
================================== Length Number ==================================================
<iNumber iStore="Data" iKey="number" iType="number" ></iNumber>
//12345

<iNumber iStore="Data" iKey="integer" iType="integer" ></iNumber>
//12,345

<iNumber iStore="Data" iKey="integermoney" iType="integermoney" ></iNumber>
//$ 12,345

<iNumber iStore="Data" iKey="decimal" iType="decimal" ></iNumber>
//12,345.89

<iNumber iStore="Data" iKey="decimalmoney" iType="decimalmoney" ></iNumber>
//$ 12345.89

<iNumber iStore="Data" iKey="decimal" iType="decimal" ></iNumber>
//12345.67890

<iNumber iStore="Data" iKey="decimalmoney" iType="decimalmoney" ></iNumber>
//$ 12345.67890
```
```html
================================== Symbol Money ==================================================
<iNumber iStore="Data" iKey="integermoney" iType="integermoney" iSymbol="currency"></iNumber>
//THB 12,345

<iNumber iStore="Data" iKey="decimalmoney" iType="decimalmoney" iSymbol="currency"></iNumber>
//THB 12,345.67890

<iNumber iStore="Data" iKey="integermoney" iType="integermoney" iSymbol="Symbol"></iNumber>
//$ 12,345

<iNumber iStore="Data" iKey="decimalmoney" iType="decimalmoney" iSymbol="Symbol"></iNumber>
//$ 12,345.67890


```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iType| number ,integer ,integermoney ,decimal ,decimalmoney ,cellphone ,homephone ,creditcard|
iMaxLength| Maximum of number|
iDecimalLength| Digit of Decimal|
iDecimalLength| currency or Symbol|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html)|

#### iAddress Component

```html
<iAddress iStore="Data" 
          iSubDistrict="subDistrictKey" iDistrict="districtKey" iProvince="provinceKey" iZipcode="zipcodeKey" iKey="subDistrict" iVal="subDistrict" iDisplay="subDistrict" iRequire="required" />

<iAddress iStore="Data" 
          iSubDistrict="subDistrictKey" iDistrict="districtKey" iProvince="provinceKey" iZipcode="zipcodeKey" 
          iKey="district" iVal="district" iDisplay="district" iRequire="required" />

<iAddress iStore="Data" 
          iSubDistrict="subDistrictKey" iDistrict="districtKey" iProvince="provinceKey" iZipcode="zipcodeKey" 
          iKey="province" iVal="province" iDisplay="province" iRequire="required" />
     
<iAddress iStore="Data" 
          iSubDistrict="subDistrictKey" iDistrict="districtKey" iProvince="provinceKey" iZipcode="zipcodeKey" 
          iKey="zipcode" iVal="zipcode" iDisplay="zipcode" iRequire="required" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Determines the type of components used that have subDistrict,district,province,zipcode|
iVal| Determines the type of components used that have subDistrict,district,province,zipcode|
iDisplay| Determines the type of components used that have subDistrict,district,province,zipcode|
iSubDistrict | Index field name in State Store|
iDistrict | Index field name in State Store|
iProvince | Index field name in State Store|
iZipcode | Index field name in State Store|
iRequire| 'required' or '' |

#### iDistrict Component

```html
 <iDistrict iStore="Data" iKey="name" iRequire="required" iType="readonly" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iRequire| 'required' or '' |
iType| 'readonly' or '' |

#### iProvince Component

```html
 <iProvince iStore="Data" iKey="name" iRequire="required" iType="readonly" />
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iRequire| 'required' or '' |
iType| 'readonly' or '' |

#### iStep Component
```html
 <iStep  
     :iData="obj"
  />

  <script>
export default {
    ...

    data(){
      return{
        obj:[
          {title:'A','icon':'fab fa-angellist',active:true,'des':'test A'},
          {title:'B','icon':'fab fa-angellist',active:false,'des':'test B'},
          {title:'C','icon':'fab fa-angellist',active:false,'des':'test C'},
        ]
      }
    }
    
    ...
}
</script>

```

#### iLoadingJS is file js use animation laoding for actions

```html
<script>

import iLoadingJS from 'iform-zt';

const time_seconds = 5000 // seconds or not use time_seconds system is default second iLoadingJS
iLoadingJS.animationLoad.startLoad(time_seconds);

<script>

```

#### iSelectSearch Component

```html
 <iSelectSearch 
  iVal="name" 
  iDisplay="name" 
  iType="link" 
  iData="/api/employeeType" 
  iName="ค้นหา"
  v-on:returnValue="CallFunction"
  />

  <script>

  import iSelectSearch from 'iform-zt';

  export default {
    components:{ iSelectSearch },
    methods: {
      CallFunction(value){
        console.log(value);
        // code here
    }
    ...
  }
  
  <script>

```
Attribute| Description|
--- | --- |
iVal| keyname binding value in option select |
iDisplay| keyname binding label in option select|
iType| link: path web api ,or array: data array |
iData| '/api/demo/' or array[ ] *If you choose iType="array" please change props name to :iData |
iName| placeholder |
v-on:returnValue| emit value from child to function |

#### iPDFViewer Component

```html
 <iPDFViewer iHeight="700px" :iUrl="url" />

 Installation
 npm i vue-instant-pdf-viewer
 
 Using
 import iPDFViewer from 'iform-zt';

 <script src="/js/static/lib/pdfobject.min.js"></script>  to /views/ ___.blade.php
```
Attribute| Description|
--- | --- |
iHeight| Display height - example:700px |
iUrl| URL for displaying PDF results |

#### iNumberV2 Component

```html
<iNumberV2 iStore="Data" iKey="name" iRequire="required" iMaxlength="13" iType="currency" iReadonly="readonly"></iNumberV2>
<iNumberV2 iStore="Data" iKey="name" iRequire="regex:\d{1}-\d{4}-\d{5}-\d{2}-\d{1}" iMaxlength="13" iType="IDCard" iReadonly=""></iNumberV2>
```
Attribute| Description|
--- | --- |
iStore| Store 'Vuex' ModulesName|
iKey| Index field name in State Store|
iRequire| attribute: [Document](https://baianat.github.io/vee-validate/guide/rules.html) |
iType| number,decimal,currency,IDCard|
iMaxlength| Max length|
iReadonly| readonly,disabled|
** If you use iType="IDCard" please enter iRequire="regex:\d{1}-\d{4}-\d{5}-\d{2}-\d{1}"

## Attribute 
attribute/component| iSelect | iUpload | iNumber | iDate | iTextarea | iTextbox | iCheckBox 
--- | --- | --- | --- |--- |--- |--- |--- 
iStore| &#x2714; | &#x2714; | &#x2714;| &#x2714;| &#x2714;| &#x2714;| &#x2714;
iKey| &#x2714; | &#x2714; | &#x2714;| &#x2714;| &#x2714;| &#x2714;| &#x2714;
iRequire| &#x2714; | &#x2714; | &#x2714;| &#x2714;| &#x2714;| &#x2714;| &#x2714;
iVal| &#x2714; |- | &#x2714;|-| &#x2714;| &#x2714;|-
iType| &#x2714; |- | &#x2714;|-|-|-|-
iDisplay| &#x2714; |- | &#x2714;|-|-|-| &#x2714;
iData| &#x2714; |- | &#x2714;|-|-|-|-
iMaxLength|- |- | &#x2714;|-|-|-|-
iDecimalLength|- |- | &#x2714;|-|-|-|-
iDecimalLength|- |- | &#x2714;|-|-|-|-
iSymbol|- |- | &#x2714;|-|-|-|-
iRows|- |- |-|-| &#x2714;|-|-
iCols|- |- |-|-| &#x2714;|-|-
iLink|- | &#x2714; |-|-|-|-|-



## License
[ZT](https://smelink.net/company/zawanna-technology-company-limited.html)