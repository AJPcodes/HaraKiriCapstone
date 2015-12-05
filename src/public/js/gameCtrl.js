//controller for the add song form
app.controller('GameCtrl',['$rootScope', function($rootScope) {

	this.deckStyle = "http://www.cheetahplayingcards.com/images/cheetah-card.gif";

	this.player1 = {
		name: "Player 1",
		score: 0,

		cards: [
{
images: {
svg: "http://deckofcardsapi.com/static/img/8C.svg",
png: "http://deckofcardsapi.com/static/img/8C.png"
},
code: "8C",
value: "8",
image: "http://deckofcardsapi.com/static/img/8C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/5C.svg",
png: "http://deckofcardsapi.com/static/img/5C.png"
},
code: "5C",
value: "5",
image: "http://deckofcardsapi.com/static/img/5C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/8D.svg",
png: "http://deckofcardsapi.com/static/img/8D.png"
},
code: "8D",
value: "8",
image: "http://deckofcardsapi.com/static/img/8D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/7H.svg",
png: "http://deckofcardsapi.com/static/img/7H.png"
},
code: "7H",
value: "7",
image: "http://deckofcardsapi.com/static/img/7H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/QH.svg",
png: "http://deckofcardsapi.com/static/img/QH.png"
},
code: "QH",
value: "QUEEN",
image: "http://deckofcardsapi.com/static/img/QH.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/JH.svg",
png: "http://deckofcardsapi.com/static/img/JH.png"
},
code: "JH",
value: "JACK",
image: "http://deckofcardsapi.com/static/img/JH.png",
suit: "HEARTS"
}
]
	} //end player 1

		this.player2 = {
		name: "Player 2",
		score: 0,

cards: [
{
images: {
svg: "http://deckofcardsapi.com/static/img/0H.svg",
png: "http://deckofcardsapi.com/static/img/0H.png"
},
code: "0H",
value: "10",
image: "http://deckofcardsapi.com/static/img/0H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/9D.svg",
png: "http://deckofcardsapi.com/static/img/9D.png"
},
code: "9D",
value: "9",
image: "http://deckofcardsapi.com/static/img/9D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/6C.svg",
png: "http://deckofcardsapi.com/static/img/6C.png"
},
code: "6C",
value: "6",
image: "http://deckofcardsapi.com/static/img/6C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/AC.svg",
png: "http://deckofcardsapi.com/static/img/AC.png"
},
code: "AC",
value: "ACE",
image: "http://deckofcardsapi.com/static/img/AC.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/4S.svg",
png: "http://deckofcardsapi.com/static/img/4S.png"
},
code: "4S",
value: "4",
image: "http://deckofcardsapi.com/static/img/4S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/8S.svg",
png: "http://deckofcardsapi.com/static/img/8S.png"
},
code: "8S",
value: "8",
image: "http://deckofcardsapi.com/static/img/8S.png",
suit: "SPADES"
}
]

	} //end player 2

this.deck = {cards: [
{
images: {
svg: "http://deckofcardsapi.com/static/img/JC.svg",
png: "http://deckofcardsapi.com/static/img/JC.png"
},
code: "JC",
value: "JACK",
image: "http://deckofcardsapi.com/static/img/JC.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/9S.svg",
png: "http://deckofcardsapi.com/static/img/9S.png"
},
code: "9S",
value: "9",
image: "http://deckofcardsapi.com/static/img/9S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/6S.svg",
png: "http://deckofcardsapi.com/static/img/6S.png"
},
code: "6S",
value: "6",
image: "http://deckofcardsapi.com/static/img/6S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/JD.svg",
png: "http://deckofcardsapi.com/static/img/JD.png"
},
code: "JD",
value: "JACK",
image: "http://deckofcardsapi.com/static/img/JD.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/4D.svg",
png: "http://deckofcardsapi.com/static/img/4D.png"
},
code: "4D",
value: "4",
image: "http://deckofcardsapi.com/static/img/4D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/0C.svg",
png: "http://deckofcardsapi.com/static/img/0C.png"
},
code: "0C",
value: "10",
image: "http://deckofcardsapi.com/static/img/0C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/3D.svg",
png: "http://deckofcardsapi.com/static/img/3D.png"
},
code: "3D",
value: "3",
image: "http://deckofcardsapi.com/static/img/3D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/7D.svg",
png: "http://deckofcardsapi.com/static/img/7D.png"
},
code: "7D",
value: "7",
image: "http://deckofcardsapi.com/static/img/7D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/KS.svg",
png: "http://deckofcardsapi.com/static/img/KS.png"
},
code: "KS",
value: "KING",
image: "http://deckofcardsapi.com/static/img/KS.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/2D.svg",
png: "http://deckofcardsapi.com/static/img/2D.png"
},
code: "2D",
value: "2",
image: "http://deckofcardsapi.com/static/img/2D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/2S.svg",
png: "http://deckofcardsapi.com/static/img/2S.png"
},
code: "2S",
value: "2",
image: "http://deckofcardsapi.com/static/img/2S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/2C.svg",
png: "http://deckofcardsapi.com/static/img/2C.png"
},
code: "2C",
value: "2",
image: "http://deckofcardsapi.com/static/img/2C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/AS.svg",
png: "http://deckofcardsapi.com/static/img/AS.png"
},
code: "AS",
value: "ACE",
image: "http://deckofcardsapi.com/static/img/AS.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/9C.svg",
png: "http://deckofcardsapi.com/static/img/9C.png"
},
code: "9C",
value: "9",
image: "http://deckofcardsapi.com/static/img/9C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/9H.svg",
png: "http://deckofcardsapi.com/static/img/9H.png"
},
code: "9H",
value: "9",
image: "http://deckofcardsapi.com/static/img/9H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/3S.svg",
png: "http://deckofcardsapi.com/static/img/3S.png"
},
code: "3S",
value: "3",
image: "http://deckofcardsapi.com/static/img/3S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/4C.svg",
png: "http://deckofcardsapi.com/static/img/4C.png"
},
code: "4C",
value: "4",
image: "http://deckofcardsapi.com/static/img/4C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/KH.svg",
png: "http://deckofcardsapi.com/static/img/KH.png"
},
code: "KH",
value: "KING",
image: "http://deckofcardsapi.com/static/img/KH.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/0S.svg",
png: "http://deckofcardsapi.com/static/img/0S.png"
},
code: "0S",
value: "10",
image: "http://deckofcardsapi.com/static/img/0S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/8H.svg",
png: "http://deckofcardsapi.com/static/img/8H.png"
},
code: "8H",
value: "8",
image: "http://deckofcardsapi.com/static/img/8H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/3C.svg",
png: "http://deckofcardsapi.com/static/img/3C.png"
},
code: "3C",
value: "3",
image: "http://deckofcardsapi.com/static/img/3C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/7S.svg",
png: "http://deckofcardsapi.com/static/img/7S.png"
},
code: "7S",
value: "7",
image: "http://deckofcardsapi.com/static/img/7S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/KD.svg",
png: "http://deckofcardsapi.com/static/img/KD.png"
},
code: "KD",
value: "KING",
image: "http://deckofcardsapi.com/static/img/KD.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/0D.svg",
png: "http://deckofcardsapi.com/static/img/0D.png"
},
code: "0D",
value: "10",
image: "http://deckofcardsapi.com/static/img/0D.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/6H.svg",
png: "http://deckofcardsapi.com/static/img/6H.png"
},
code: "6H",
value: "6",
image: "http://deckofcardsapi.com/static/img/6H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/QC.svg",
png: "http://deckofcardsapi.com/static/img/QC.png"
},
code: "QC",
value: "QUEEN",
image: "http://deckofcardsapi.com/static/img/QC.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/QS.svg",
png: "http://deckofcardsapi.com/static/img/QS.png"
},
code: "QS",
value: "QUEEN",
image: "http://deckofcardsapi.com/static/img/QS.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/5S.svg",
png: "http://deckofcardsapi.com/static/img/5S.png"
},
code: "5S",
value: "5",
image: "http://deckofcardsapi.com/static/img/5S.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/JS.svg",
png: "http://deckofcardsapi.com/static/img/JS.png"
},
code: "JS",
value: "JACK",
image: "http://deckofcardsapi.com/static/img/JS.png",
suit: "SPADES"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/QD.svg",
png: "http://deckofcardsapi.com/static/img/QD.png"
},
code: "QD",
value: "QUEEN",
image: "http://deckofcardsapi.com/static/img/QD.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/AH.svg",
png: "http://deckofcardsapi.com/static/img/AH.png"
},
code: "AH",
value: "ACE",
image: "http://deckofcardsapi.com/static/img/AH.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/5H.svg",
png: "http://deckofcardsapi.com/static/img/5H.png"
},
code: "5H",
value: "5",
image: "http://deckofcardsapi.com/static/img/5H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/4H.svg",
png: "http://deckofcardsapi.com/static/img/4H.png"
},
code: "4H",
value: "4",
image: "http://deckofcardsapi.com/static/img/4H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/7C.svg",
png: "http://deckofcardsapi.com/static/img/7C.png"
},
code: "7C",
value: "7",
image: "http://deckofcardsapi.com/static/img/7C.png",
suit: "CLUBS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/AD.svg",
png: "http://deckofcardsapi.com/static/img/AD.png"
},
code: "AD",
value: "ACE",
image: "http://deckofcardsapi.com/static/img/AD.png",
suit: "DIAMONDS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/2H.svg",
png: "http://deckofcardsapi.com/static/img/2H.png"
},
code: "2H",
value: "2",
image: "http://deckofcardsapi.com/static/img/2H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/3H.svg",
png: "http://deckofcardsapi.com/static/img/3H.png"
},
code: "3H",
value: "3",
image: "http://deckofcardsapi.com/static/img/3H.png",
suit: "HEARTS"
},
{
images: {
svg: "http://deckofcardsapi.com/static/img/6D.svg",
png: "http://deckofcardsapi.com/static/img/6D.png"
},
code: "6D",
value: "6",
image: "http://deckofcardsapi.com/static/img/6D.png",
suit: "DIAMONDS"
}
]

}

}]); //end optionsCtrl




