const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

if(process.env.NODE_ENV === 'production'){
	app.use(express.static(__dirname+'/public'));
	app.get('/.*/', (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

mongoose.connect("mongodb+srv://shreesha:Srihari108@cluster0-uwnxv.mongodb.net/result?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.on("connected", err =>{
	if(err) throw err;
	console.log("Connected to DB");
});

const SciSchema = mongoose.Schema({
	EXNO: String,
	NAME: String,
	FNAME: String,
	COMB: String,
	LANG: String,
	ENG: String,
	PHY_TH: String,
	PHY_PR: String,
	PHY_TOT: String,
	CHE_TH: String,
	CHE_PR: String,
	CHE_TOT: String,
	MATHS: String,
	COMB_TH: String,
	COMB_PR: String,
	COMB_TOT: String,
	TOTAL: String,
	RESU: String 
});


const ComSchema = mongoose.Schema({
	EXNO: String,
	NAME: String,
	FNAME: String,
	COMB: String,
	LANG: String,
	ENG: String,
	HIS_TH: String,
	HIS_PR: String,
	HIS_TOT: String,
	ECO_TH: String,
	BUSI_TH: String,
	ACCT_TH: String,
	TOTAL: String,
	RESU: String 
});

const EduSchema = mongoose.Schema({
	EXNO: String,
	NAME: String,
	FNAME: String,
	COMB: String,
	LANG: String,
	ENG: String,
	HIS_TH: String,
	ECO_TH: String,
	SOC_TH: String,
	EDN_TH: String,
	TOTAL: String,
	RESU: String 
});

const PolSchema = mongoose.Schema({
	EXNO: String,
	NAME: String,
	FNAME: String,
	COMB: String,
	LANG: String,
	ENG: String,
	HIS_TH: String,
	ECO_TH: String,
	SOC_TH: String,
	POL_TH: String,
	TOTAL: String,
	RESU: String 
});



const SciModel = mongoose.model("science", SciSchema);
const ComModel = mongoose.model("commerce", ComSchema);
const EduModel = mongoose.model("education", EduSchema);
const PolModel = mongoose.model("political", PolSchema);

app.post("/api/posts/new", (req, res) => {
	let payload = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author,
		timestamp: new Date().getTime(),
		time: new Date().getTime()
	}
	let newPost = new PolModel(payload);
	newPost.save((err, result) => {
		if(err) res.send({success: false, msg: err});

		res.send({success: true, result: result});
	});
});


app.get("/", (req, res) => {
	res.send("Heloo");
});

app.get("/api/results/science/all", (req, res) => {
	SciModel.find((err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
});

app.get("/api/result/science/:_exno", cors(),(req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	SciModel.find({'EXNO':req.params._exno}, (err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
});

app.get("/api/results/commerce/all", (req, res) => {
	ComModel.find((err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
});

app.get("/api/result/commerce/:_exno", (req, res) => {
	ComModel.find({'EXNO':req.params._exno}, (err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
})

app.get("/api/results/education/all", (req, res) => {
	EduModel.find((err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
});

app.get("/api/result/education/:_exno", (req, res) => {
	EduModel.find({'EXNO':req.params._exno}, (err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
})

app.get("/api/results/political/all", (req, res) => {
	PolModel.find((err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
});

app.get("/api/result/political/:_exno", (req, res) => {
	PolModel.find({'EXNO':req.params._exno}, (err, result) => {
		if (err) res.send({success: false, msg: err });

		res.send({success: true, result: result });
	});
})


app.listen(process.env.PORT || 3000, err => {
	if(err) console.error(err);
	console.log("Server has started at port %s", process.env.PORT || 3000);
});
