import { Component, Listen, State } from '@stencil/core';


@Component({
    tag: 'infinite-list-page',
    styleUrl: 'infinite-list-page.scss'
})
export class CwcInfiniteList {

    @State() users1: any[] = [];
//    @State() users1: any = [{"gender":"female","name":{"title":"miss","first":"louane","last":"vidal"},
//     "location":{"street":"2479 place du 8 février 1962","city":"avignon","state":"vendée","postcode":78276,"coordinates":{"latitude":"2.0565","longitude":"95.2422"},"timezone":{"offset":"+1:00","description":"Brussels, Copenhagen, Madrid, Paris"}},"email":"louane.vidal@example.com","login":{"uuid":"9f07341f-c7e6-45b7-bab0-af6de5a4582d","username":"angryostrich988","password":"r2d2","salt":"B5ywSDUM","md5":"afce5fbe8f32bcec1a918f75617ab654","sha1":"1a5b1afa1d9913cf491af64ce78946d18fea6b04","sha256":"0124895aa1e6e5fb0596fad4c413602e0922e8a8c2dc758bbdb3fa070ad25a07"},"dob":{"date":"1965-12-20T13:32:15Z","age":52},"registered":{"date":"2015-07-25T23:14:54Z","age":2},"phone":"02-62-35-18-98","cell":"06-07-80-83-11","id":{"name":"INSEE","value":"2NNaN01776236 16"},"picture":{"large":"https://randomuser.me/api/portraits/women/88.jpg","medium":"https://randomuser.me/api/portraits/med/women/88.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/88.jpg"},"nat":"FR"},{"gender":"male","name":{"title":"mr","first":"don","last":"white"},"location":{"street":"4542 rochestown road","city":"sallins","state":"monaghan","postcode":44584,"coordinates":{"latitude":"89.4367","longitude":"135.6354"},"timezone":{"offset":"+11:00","description":"Magadan, Solomon Islands, New Caledonia"}},"email":"don.white@example.com","login":{"uuid":"1cd1e622-12bb-4b35-a2c9-63ff7bda6c73","username":"angryduck156","password":"0101","salt":"XDlG0rRr","md5":"35e6f5e0247d43f6dec0056c8317f320","sha1":"ee6a3affc22de617283eb28e8df7fab72b153052","sha256":"6cf456410cf19343336972d23d00d0884fed29c3e73a5584aeae2eeda3a48758"},"dob":{"date":"1949-08-25T19:03:36Z","age":68},"registered":{"date":"2016-04-28T08:03:55Z","age":2},"phone":"051-441-5241","cell":"081-956-4429","id":{"name":"PPS","value":"5081227T"},"picture":{"large":"https://randomuser.me/api/portraits/men/38.jpg","medium":"https://randomuser.me/api/portraits/med/men/38.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/38.jpg"},"nat":"IE"},{"gender":"male","name":{"title":"mr","first":"loan","last":"lucas"},"location":{"street":"2256 place de l'église","city":"argenteuil","state":"lot-et-garonne","postcode":87662,"coordinates":{"latitude":"3.9825","longitude":"176.6213"},"timezone":{"offset":"+7:00","description":"Bangkok, Hanoi, Jakarta"}},"email":"loan.lucas@example.com","login":{"uuid":"4b400301-d696-4618-862e-8a673f80e334","username":"orangepanda844","password":"wonderboy","salt":"iHPZA8UP","md5":"97eca8070d96e8e27b1c468e9cb3fd9e","sha1":"23c5a9a09387d4d9b381c5f86330a1629971a7fa","sha256":"817b0ddb16a74507134956bcd0e80467e5efbcc309116bf3caf98199b6c54e59"},"dob":{"date":"1991-10-03T09:36:23Z","age":26},"registered":{"date":"2007-05-27T06:42:59Z","age":11},"phone":"04-56-18-88-34","cell":"06-74-93-14-75","id":{"name":"INSEE","value":"1NNaN18631077 64"},"picture":{"large":"https://randomuser.me/api/portraits/men/3.jpg","medium":"https://randomuser.me/api/portraits/med/men/3.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/3.jpg"},"nat":"FR"},{"gender":"male","name":{"title":"monsieur","first":"arno","last":"brun"},"location":{"street":"3976 rue de la mairie","city":"stocken-höfen","state":"schaffhausen","postcode":9563,"coordinates":{"latitude":"52.7455","longitude":"6.1478"},"timezone":{"offset":"+7:00","description":"Bangkok, Hanoi, Jakarta"}},"email":"arno.brun@example.com","login":{"uuid":"679d3319-d28a-4d6f-baf8-bde50a8a2edd","username":"whitebutterfly474","password":"shonuf","salt":"DDoEyFRG","md5":"394d45b58344b04772234b6fd54bbfd1","sha1":"2fccefa4bbcd5e0d22f867652d617112968a582f","sha256":"044cf6fd20327cc39f2a8cad8f972bef7591a7d662afdb4ae19b5ba4d4c9d746"},"dob":{"date":"1982-06-25T23:51:59Z","age":35},"registered":{"date":"2014-03-19T04:29:03Z","age":4},"phone":"(379)-340-0466","cell":"(727)-174-4592","id":{"name":"AVS","value":"756.3936.3115.16"},"picture":{"large":"https://randomuser.me/api/portraits/men/23.jpg","medium":"https://randomuser.me/api/portraits/med/men/23.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/23.jpg"},"nat":"CH"},{"gender":"male","name":{"title":"mr","first":"sigmar","last":"kießling"},"location":{"street":"berliner straße 142","city":"weilheim-schongau","state":"sachsen","postcode":45132,"coordinates":{"latitude":"-18.3929","longitude":"-5.5054"},"timezone":{"offset":"+4:30","description":"Kabul"}},"email":"sigmar.kießling@example.com","login":{"uuid":"b7e527c8-3ca5-430c-ba83-711d6ad98773","username":"bluezebra268","password":"presiden","salt":"Mek6MaY0","md5":"2bed9bf64f596d625ef13f05522a0016","sha1":"911ad7d34ec9c823ea8958b5ec8d65338a0c5cf0","sha256":"760227b1c4c59f58b006d14cb3c45b3fab33959692d3542cc4bc177aadbb89c4"},"dob":{"date":"1960-08-21T11:29:02Z","age":57},"registered":{"date":"2016-12-15T11:54:24Z","age":1},"phone":"0561-2795710","cell":"0173-8872460","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/45.jpg","medium":"https://randomuser.me/api/portraits/med/men/45.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/45.jpg"},"nat":"DE"},{"gender":"male","name":{"title":"mr","first":"florian","last":"dobler"},"location":{"street":"lindenstraße 55","city":"trebbin","state":"brandenburg","postcode":69783,"coordinates":{"latitude":"-1.8238","longitude":"-38.6202"},"timezone":{"offset":"-8:00","description":"Pacific Time (US & Canada)"}},"email":"florian.dobler@example.com","login":{"uuid":"8b8ce16b-b3f5-4cf5-a007-a9c4c2c778f4","username":"organicgoose847","password":"trek","salt":"7ZxlZ1kP","md5":"2624d26bb343a17ad07cf3592d8b8f50","sha1":"5daaf606c1cc4f22feace987d52f530a70744cf2","sha256":"43b72ca42bb8820a1b9e793987304c37aa635792c2a5e3539d7620410e0e2179"},"dob":{"date":"1986-11-17T02:22:35Z","age":31},"registered":{"date":"2002-07-15T06:02:58Z","age":15},"phone":"0785-1811444","cell":"0179-8390123","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/32.jpg","medium":"https://randomuser.me/api/portraits/med/men/32.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/32.jpg"},"nat":"DE"},{"gender":"female","name":{"title":"ms","first":"iida","last":"peura"},"location":{"street":"4273 hämeenkatu","city":"kajaani","state":"uusimaa","postcode":46205,"coordinates":{"latitude":"-35.4549","longitude":"149.0069"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"email":"iida.peura@example.com","login":{"uuid":"6a52282a-46d6-4a71-ac69-12ea0dfb3f24","username":"redfrog830","password":"rachel","salt":"mW5wRfzD","md5":"7394f7d44bc87d0eed2d6be737de4d20","sha1":"8241244c54b3e562d4f00cae650dbb9b16605915","sha256":"71f6b6dd9ab011de96a780a0b96f7040e2c284f54989cbdca8188670ec172847"},"dob":{"date":"1953-10-14T11:58:12Z","age":64},"registered":{"date":"2006-05-28T15:19:26Z","age":12},"phone":"09-167-970","cell":"041-352-54-27","id":{"name":"HETU","value":"NaNNA238undefined"},"picture":{"large":"https://randomuser.me/api/portraits/women/7.jpg","medium":"https://randomuser.me/api/portraits/med/women/7.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/7.jpg"},"nat":"FI"},{"gender":"male","name":{"title":"mr","first":"شایان","last":"یاسمی"},"location":{"street":"2633 میدان شهیدان رحیمی","city":"کرمان","state":"کرمانشاه","postcode":57373,"coordinates":{"latitude":"73.3382","longitude":"-15.8943"},"timezone":{"offset":"-4:00","description":"Atlantic Time (Canada), Caracas, La Paz"}},"email":"شایان.یاسمی@example.com","login":{"uuid":"8a23be8b-115d-4ec3-ba0b-47422f9d3afd","username":"bluegoose643","password":"homerun","salt":"ppW5EINh","md5":"6ebfbeb822dd6db116b9df8e659c0def","sha1":"26504936da013f79eb7a22e5414e831360930deb","sha256":"40de6510d41a653e80356942717ba42623fd51c8cecba064393960a627760935"},"dob":{"date":"1980-12-06T11:21:31Z","age":37},"registered":{"date":"2005-08-27T09:33:26Z","age":12},"phone":"071-05792846","cell":"0977-107-8278","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/81.jpg","medium":"https://randomuser.me/api/portraits/med/men/81.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/81.jpg"},"nat":"IR"},{"gender":"male","name":{"title":"mr","first":"harry","last":"thomas"},"location":{"street":"715 roscommon road","city":"dunedin","state":"otago","postcode":25493,"coordinates":{"latitude":"-20.3448","longitude":"-114.4092"},"timezone":{"offset":"-3:00","description":"Brazil, Buenos Aires, Georgetown"}},"email":"harry.thomas@example.com","login":{"uuid":"dd2ae95d-c05b-4e83-9226-76ed6f023546","username":"redpeacock807","password":"horndog","salt":"MvC0ajKz","md5":"9fbd3996b6e355991e0fe0251fcdd9c6","sha1":"e6274de97c9c63b450b03a83d5f5c6ffbc910615","sha256":"3066d4d8ac94e791c08d9312d8f37de3e4c8bdbc9cd238dfbf361be5023c6b2c"},"dob":{"date":"1960-01-02T06:10:30Z","age":58},"registered":{"date":"2016-02-03T20:29:14Z","age":2},"phone":"(229)-993-1818","cell":"(185)-084-4877","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/men/18.jpg","medium":"https://randomuser.me/api/portraits/med/men/18.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/18.jpg"},"nat":"NZ"},{"gender":"male","name":{"title":"mr","first":"gary","last":"clarke"},"location":{"street":"3999 o'connell street","city":"balbriggan","state":"roscommon","postcode":11148,"coordinates":{"latitude":"48.2435","longitude":"-61.3271"},"timezone":{"offset":"+3:00","description":"Baghdad, Riyadh, Moscow, St. Petersburg"}},"email":"gary.clarke@example.com","login":{"uuid":"be8633e6-3ce5-4b16-bba5-c241e2acfc12","username":"blackgorilla831","password":"rangers1","salt":"oCmjuxdM","md5":"9dd8e8a6a734d5a0b350aea5be880ce3","sha1":"2615a9ae6e7173662b39ff01b472f4e37d25de7e","sha256":"543879e2f7e5a0988a98c2dcb5f94b72e06a413002d6d8624c141b036634a3aa"},"dob":{"date":"1992-01-09T08:56:10Z","age":26},
//     "registered":{"date":"2006-11-02T19:40:35Z","age":11},"phone":"071-830-5310","cell":"081-659-8217","id":{"name":"PPS","value":"9479368T"},"picture":{"large":"https://randomuser.me/api/portraits/men/21.jpg","medium":"https://randomuser.me/api/portraits/med/men/21.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/21.jpg"},"nat":"IE"},
//     {"gender":"male","name":{"title":"mr","first":"john","last":"phillips"},"location":{"street":"1074 timber wolf trail","city":"seagoville","state":"nebraska","postcode":93041,"coordinates":{"latitude":"-34.7592","longitude":"3.3898"},"timezone":{"offset":"0:00","description":"Western Europe Time, London, Lisbon, Casablanca"}},"email":"john.phillips@example.com","login":{"uuid":"3873c36f-a18f-444c-ad83-4ce79a17359a","username":"angrywolf152","password":"cumshot","salt":"AM01ATQ6","md5":"f983cc328d82609dcc7c9bd59d0973d6","sha1":"2e8ab09bcc3520f0156edde648f837ce14b5df72","sha256":"eec4558db97fe70ab886b648228dbaa6a592c5322b91183e31bbf4b4824f113f"},"dob":{"date":"1987-01-04T12:00:23Z","age":31},"registered":{"date":"2015-11-07T11:07:54Z","age":2},"phone":"(223)-647-2864","cell":"(922)-005-3825","id":{"name":"SSN","value":"370-95-3203"},"picture":{"large":"https://randomuser.me/api/portraits/men/84.jpg","medium":"https://randomuser.me/api/portraits/med/men/84.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/84.jpg"},"nat":"US"},{"gender":"female","name":{"title":"mrs","first":"laura","last":"mortensen"},"location":{"street":"112 brinken","city":"aarhus n","state":"hovedstaden","postcode":80723,"coordinates":{"latitude":"-51.9113","longitude":"114.4710"},"timezone":{"offset":"-9:00","description":"Alaska"}},"email":"laura.mortensen@example.com","login":{"uuid":"c109bf3e-79bb-420b-93bd-d76b51c29295","username":"silverzebra752","password":"maryland","salt":"uku84MZn","md5":"dc3f9f7266ae793d53785ce137ee8699","sha1":"9963ea7dbc05d8adddacf32f8c3813de0abc3b9a","sha256":"b84ab43e6c0b3cc23facd09c3f983cd98590ffbeb0e8fd940ff57e76c8364d2f"},"dob":{"date":"1951-04-12T13:37:10Z","age":67},"registered":{"date":"2014-02-10T11:15:00Z","age":4},"phone":"76877603","cell":"11258586","id":{"name":"CPR","value":"879255-9403"},"picture":{"large":"https://randomuser.me/api/portraits/women/91.jpg","medium":"https://randomuser.me/api/portraits/med/women/91.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/91.jpg"},"nat":"DK"},{"gender":"male","name":{"title":"mr","first":"randy","last":"bradley"},"location":{"street":"1814 alexander road","city":"truro","state":"shropshire","postcode":"IZ67 5RD","coordinates":{"latitude":"-8.3241","longitude":"178.4076"},"timezone":{"offset":"+9:00","description":"Tokyo, Seoul, Osaka, Sapporo, Yakutsk"}},"email":"randy.bradley@example.com","login":{"uuid":"02967acc-4d24-44ee-b52e-2c2e90d77ebb","username":"goldenlion605","password":"jason1","salt":"vz30hAF5","md5":"baaedfcd81242f34448bb9ef3289a2a8","sha1":"3a00bdd4ffb2a619b880233e807ff97dbccf822f","sha256":"0a6333e6cf0022775e40f0fd758060c8877c47fc1872c7ae0811ae9e605738f2"},"dob":{"date":"1994-05-12T06:19:31Z","age":24},"registered":{"date":"2014-05-12T04:17:05Z","age":4},"phone":"0181 967 4234","cell":"0718-554-884","id":{"name":"NINO","value":"WX 73 28 69 G"},"picture":{"large":"https://randomuser.me/api/portraits/men/34.jpg","medium":"https://randomuser.me/api/portraits/med/men/34.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/34.jpg"},"nat":"GB"},{"gender":"female","name":{"title":"miss","first":"susana","last":"alonso"},"location":{"street":"5677 calle de arturo soria","city":"torrente","state":"cantabria","postcode":39264,"coordinates":{"latitude":"16.7985","longitude":"-17.8406"},"timezone":{"offset":"+5:30","description":"Bombay, Calcutta, Madras, New Delhi"}},"email":"susana.alonso@example.com","login":{"uuid":"528681c0-3732-4560-9b26-de43ed519620","username":"happyrabbit183","password":"lillie","salt":"kcxoYUpF","md5":"72010200dde48eeb33d8214215636d1c","sha1":"bc964ddfe676604e43f13e2364e2420fc95de03c","sha256":"43a5794e1619c6ceeb41b7db49be6e4e92060eacbb8eab0e905a34d85e0e6800"},"dob":{"date":"1978-11-09T02:12:53Z","age":39},"registered":{"date":"2007-05-13T16:08:08Z","age":11},"phone":"967-373-909","cell":"647-448-919","id":{"name":"DNI","value":"63534877-Q"},"picture":{"large":"https://randomuser.me/api/portraits/women/25.jpg","medium":"https://randomuser.me/api/portraits/med/women/25.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/25.jpg"},"nat":"ES"},{"gender":"female","name":{"title":"mrs","first":"natalie","last":"lewis"},"location":{"street":"5620 peachgrove road","city":"masterton","state":"taranaki","postcode":59495,"coordinates":{"latitude":"34.3307","longitude":"10.0601"},"timezone":{"offset":"-7:00","description":"Mountain Time (US & Canada)"}},"email":"natalie.lewis@example.com","login":{"uuid":"fc42bf6c-f6ad-4f38-b71d-d8e69fd6bae4","username":"beautifulelephant109","password":"kathy1","salt":"rxAl77Te","md5":"91aa199017667d2b205b04d99b63cf51","sha1":"748461ba7d22d0d01d3889f5f34ea483de336b8a","sha256":"928bbf5e40b86d48f9267214c6fbecc410ba6e0cea493334c694558492fbc66a"},"dob":{"date":"1962-05-22T21:53:41Z","age":56},"registered":{"date":"2011-09-14T11:08:21Z","age":6},"phone":"(943)-750-8948","cell":"(287)-921-1489","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/37.jpg","medium":"https://randomuser.me/api/portraits/med/women/37.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/37.jpg"},"nat":"NZ"},{"gender":"female","name":{"title":"mrs","first":"zoe","last":"novak"},"location":{"street":"2411 arctic way","city":"chatham","state":"prince edward island","postcode":"S1M 2X6","coordinates":{"latitude":"-84.4183","longitude":"153.8337"},"timezone":{"offset":"+11:00","description":"Magadan, Solomon Islands, New Caledonia"}},"email":"zoe.novak@example.com","login":{"uuid":"0cdd435a-6b4d-4a7f-8310-85c485b1e853","username":"tinycat128","password":"odyssey","salt":"oMtcu53U","md5":"383332b23457cc0d2c5eec31b36c040d","sha1":"a65cf9afd5d5243fc01d850bc64419a0e9c33cdf","sha256":"55b525cf2bad28521d1c4ffc367c33b530c80e7a8938931063673389567d610c"},"dob":{"date":"1984-02-02T12:32:33Z","age":34},"registered":{"date":"2014-06-02T05:10:07Z","age":4},"phone":"072-714-3938","cell":"688-802-3066","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/89.jpg","medium":"https://randomuser.me/api/portraits/med/women/89.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/89.jpg"},"nat":"CA"},{"gender":"female","name":{"title":"ms","first":"sietske","last":"van bommel"},"location":{"street":"2574 hogelandsepark","city":"nissewaard","state":"overijssel","postcode":13789,"coordinates":{"latitude":"-87.5972","longitude":"-67.8460"},"timezone":{"offset":"-3:30","description":"Newfoundland"}},"email":"sietske.vanbommel@example.com","login":{"uuid":"5a886101-04c5-425f-a9d3-9bfb2bfbadcc","username":"orangewolf994","password":"casey1","salt":"nkHoOHWX","md5":"982ff6ae5572787894cfbf8ab9c56e93","sha1":"5df45c99af209f556b6497cf6994416467df2476","sha256":"962956e0f31d72a2987d9c89fef89f57cacc07c2d5de209bb693666d3477a393"},"dob":{"date":"1986-11-23T15:12:01Z","age":31},"registered":{"date":"2017-04-21T08:42:57Z","age":1},"phone":"(344)-305-5973","cell":"(228)-068-1825","id":{"name":"BSN","value":"23443218"},"picture":{"large":"https://randomuser.me/api/portraits/women/34.jpg","medium":"https://randomuser.me/api/portraits/med/women/34.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/34.jpg"},"nat":"NL"},{"gender":"male","name":{"title":"mr","first":"idris","last":"lyse"},"location":{"street":"ullevålsveien 45","city":"silsand","state":"sogn og fjordane","postcode":"3262","coordinates":{"latitude":"19.4308","longitude":"-179.5970"},"timezone":{"offset":"-5:00","description":"Eastern Time (US & Canada), Bogota, Lima"}},"email":"idris.lyse@example.com","login":{"uuid":"43238d8d-9ebf-4489-b716-82c1e20ec156","username":"greenbird684","password":"snatch","salt":"bQcRepRd","md5":"f907ca00403ecef678f516133b9e97a6","sha1":"77518434f351166ccb9f5b39678d28b0193408c5","sha256":"3181edc93bb46945d872f9ab05e56936dbb4eff01c77e49eccad1e54fae0ff91"},"dob":{"date":"1964-10-02T15:56:17Z","age":53},"registered":{"date":"2009-08-27T03:43:59Z","age":8},"phone":"27352081","cell":"93466683","id":{"name":"FN","value":"02106445411"},"picture":{"large":"https://randomuser.me/api/portraits/men/62.jpg","medium":"https://randomuser.me/api/portraits/med/men/62.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/62.jpg"},"nat":"NO"},{"gender":"female","name":{"title":"miss","first":"gonca","last":"saygıner"},"location":{"street":"1165 vatan cd","city":"afyonkarahisar","state":"kırklareli","postcode":42973,"coordinates":{"latitude":"69.5493","longitude":"178.1298"},"timezone":{"offset":"+7:00","description":"Bangkok, Hanoi, Jakarta"}},"email":"gonca.saygıner@example.com","login":{"uuid":"168e7598-fb58-4de2-8214-b8adef4c1f65","username":"redgoose645","password":"ticklish","salt":"E65mb6jt","md5":"243a11591641ebe82f8cfef28db45708","sha1":"f118a914e3ed12aa316294df96c446364b85746d","sha256":"6956dc0e4c550e5a66beb391665c664445640f18a3d6e8ede0e0ecacafdf7267"},"dob":{"date":"1959-10-13T06:09:48Z","age":58},"registered":{"date":"2007-01-03T16:05:02Z","age":11},"phone":"(365)-972-0578","cell":"(056)-061-9204","id":{"name":"","value":null},"picture":{"large":"https://randomuser.me/api/portraits/women/2.jpg","medium":"https://randomuser.me/api/portraits/med/women/2.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/women/2.jpg"},"nat":"TR"},{"gender":"male","name":{"title":"mr","first":"nils","last":"louis"},"location":{"street":"9825 rue desaix","city":"versailles","state":"hautes-pyrénées","postcode":43045,"coordinates":{"latitude":"25.6881","longitude":"-158.0529"},"timezone":{"offset":"+1:00","description":"Brussels, Copenhagen, Madrid, Paris"}},"email":"nils.louis@example.com","login":{"uuid":"4c99c7df-bb73-4561-bae2-6de749df43d7","username":"silvermouse242","password":"fergie","salt":"1xShL1sj","md5":"8a25d1194eb0794155954f3759f4a1f6","sha1":"02971b32f58beabad08decfb0febd2d936b39363","sha256":"5a5999445606bdd9c58e7caeff8485b77f489fca1ebbc919b15d7eb3ec2c77ab"},"dob":{"date":"1971-09-06T11:05:58Z","age":46},
//     "registered":{"date":"2008-10-23T00:28:20Z","age":9},"phone":"05-91-12-47-59","cell":"06-11-65-53-21","id":{"name":"INSEE","value":"1NNaN27685428 20"},"picture":{"large":"https://randomuser.me/api/portraits/men/9.jpg","medium":"https://randomuser.me/api/portraits/med/men/9.jpg","thumbnail":"https://randomuser.me/api/portraits/thumb/men/9.jpg"},"nat":"FR"}]
//     @State() users2: any[] = [];

    @Listen('onBottomReach')
    customEventHandler(event) {

        if (event.detail === 'users-infinite') {
            // this.initUsers1Data()

            console.log('NEW ');
            
        }

        if (event.detail === 'users-boxed') {
            // this.initUsers2Data()
        }

    }

    duplicateArray() {
        this.users1 = [...this.users1, ...this.users1]
        console.log('now length is: ', this.users1.length);
    }

    // Users data methods
    componentWillLoad() {
        // this.duplicateArray()
        this.initUsers1Data(20);
        // this.initUsers1Data(20);
        // this.initUsers2Data(20);
    }

    initUsers1Data(count?: number) {

        this.getUsers(count).then(
            users => {
                console.log(users)                
                this.users1 = this.users1.concat(users)
            } 
        )
    }


    render() {
        
            return (
                <div>

                <div class="btn btn-info" onClick={() => this.initUsers1Data()}>duplicate</div>
                <cwc-infinite-list-watcher listSelector="#users-infinite"></cwc-infinite-list-watcher>
                    <cwc-list id="users-infinite"
                        items={this.users1}
                        itemAs='user'
                        wrapperClass='row'
                        addClass='custom mxy-2'
                        addClassEven='custom-even'
                        addClassFirst='custom-first'>
                            
                            <div class="card col-md-6 col-sm-12">
                           
                                <div class="card-body" >
                                    <div class="media">
                                        <img class="d-flex mr-3 rounded" src="[[=user.picture.medium]]" alt="Generic placeholder image" />
                                        <div class="media-body">
                                            <h5 class="mt-0 capitalized">[[=user.name.first]] [[=user.name.last]]</h5>

                                            <div>
                                                <span class="capitalized">
                                                    [[=user.location.city]], [[=user.location.state]],
                                                    </span>
                                                <span> [[=user.location.street]] </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> 

                    </cwc-list>
            </div>
        );
    }
    
    getUsersPage(): number {
        return (this.users1.length ) / 10 + 1
    }

    getUsers(count = 10) {

        return new Promise((resolve) => {

            const request = new XMLHttpRequest();
            request.open('GET', `https://randomuser.me/api/?page=${this.getUsersPage()}&results=${count}&seed=abc`, true);
            request.onload = () => {
                if (request.status >= 200 && request.status < 400) {
                    const data = JSON.parse(request.responseText);
                    const users = data.results;
                    resolve(users);
                } else {
                    resolve(false);
                    console.error("Users endpoint can't be reached. Status: ", request.status)

                }
            };

            request.onerror = () => console.error("Users endpoint can't be reached.")

            request.send();
        })
    }
}
