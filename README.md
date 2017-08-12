# MedHeart App
It's a medical app used for diagnosing heart diseases. It has two main components: one for diagnosing a heart disease using artificial neural networks and one for monitoring the heart beats using a fitness bracelet. As a bracelet I've used the Xiaomi Band 2.
The aim of the app is to combine these two components. In the case of increasing heart beats for a patient with a high risk of a heart disease (as predicted by the ANN), an alert (e- mail or SMS) will be sent to the patient or to his contact person. It was made using React Native, Redux & Native base.

<img src="./screenshots/start.jpg" width="200px" height="350px"></img>
<img src="./screenshots/scan.jpg" width="200px" height="350px"></img>
<img src="./screenshots/heart-rate.jpg" width="200px" height="350px"></img>
<img src="./screenshots/step1.jpg" width="200px" height="350px"></img>
<br>

<a href="https://play.google.com/store/apps/details?id=com.medheart" alt="Link app store"><img src="./screenshots/play-store.png" width="150px" height="60px"></img></a>
### Build App

```sh
$ git clone git@github.com:razvantimis/medheart.git

$ cd medheart/

$ npm install -g yarn 

$ yarn install

$ react-native link

$ react-native run-android
```






