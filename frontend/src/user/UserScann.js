import React, {useEffect, useState} from 'react';
import Tesseract from 'tesseract.js';
import Aside from "../template/Aside";
import axios from "axios";
import {Link} from "react-router-dom";
import {TbSquareRoundedNumber1, TbSquareRoundedNumber2, TbSquareRoundedNumber3, TbSquareRoundedNumber4} from "react-icons/tb";

const UserScann = () => {
    const [imageFile, setImageFile] = useState(null);
    const [recognizedText, setRecognizedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const commonErrors = {
        'ا الجموو به':'الجمهورية',
        'التوسية':'التونسية',
        'ا كع طاقة':'بطاقة',
        'الوطية': 'الوطنية',
        'الوطتية': 'الوطنية',
        'آل 4 جه تب':'14769554 اللقب',
        'بتالحاج':'بالحاج',
        'بحمال':'جمال',
        'ين':'بن',
        'هن':'بن',
        'ا امل ا تايزاوبادة':'تاريخ الولادة',
        '0500':'05202290',
        'انقب':'اللقب',
        'تزكات':'بركات',
        ' 1 ب':'',
        'اللسيم':'الاسم',
        ' نت':' بنت',
        'ضنت':'بنت',
        'الهمبد':'عبد',
        'الحملد':'الحميد',
        ' شم اليالولادة':'تاريخ الولادة',
        '169':'1969',
        '0 ِ! ضَْنت':'بنت',
        ' ميد ':' محمد ',
        'هيا آ بر <حفقة':'مكانها ',
        'الا ارعاقة 0 دا':'اريانة',
        'الوطّتية':'الوطنية',
        'باه':'بطاقة',
        'لون لت':'الوطنية',
        'جت منت':'بنت',
        'اجمال':'جمال',
        'مكمي':'محمد',
        'عا تاي':'تاريخ',
        '1 نب':'',
        'عائبا':'مكانها',
        'تيسن الا':'تونس',
        'مج':'مكانها تونس',
        'اق ونراأنم .. ':'',
        'ع |':'',
        ' . ال':'',
        '00-7 ':' 0935174 ',
        ' الوط ':' الوطنية ',
        '0/6':'00376596 ',
        '0935174':'09351747',
        'تاجاربادة':'تاريخ الولادة',
        'اقريل':'أفريل',
        'انا':'مكانها',
        'دح':'اللقب بالحاج',
        'سال':'الاسم جمال',
        'الوبابن':'الوطنية',
        'بطاقةالتعرف':'بطاقة التعريف',
        ' لقب ':' اللقب ',
        'يترزكات':'بركات',
        'ادم':'الاسم',
        'ألقفة':'ألفة',
        'ببنت':'بنت',
        ' مال ':' جمال ',
        'الدبن':'الدين',
        'ظ':'ط',
        ' تايرالويادة':'تاريخ الولادة',
        'ا م دوهي':'مكانها تونس',
        'جاتفى':'جانفي',
        ' أل ':'',
        ' 176 ':'1976',
        'التغريف':'التعريف',
        'الوطتة':'الوطنية',
        'للقب':'اللقب',
        'با ْ للملة':'بالليلة',
        'الغبد':'عبد',
        ' الحم ':' الحميد ',
        'لات تاطاللادة':' تاريخ الولادة ',
        'كمكانها':'مكانها',
        'ده لاض':'',
        '0 ات':'',
        '1 اللا':''
    };


    // Function to correct recognized text
    const correctRecognizedText = (recognizedText) => {
        // Store the original recognized text in a variable
        let correctedText = recognizedText;

        // Loop through the commonErrors object and apply the corrections
        for (const error in commonErrors) {
            // Create a regular expression using the error as the pattern, 'g' flag for global search
            const regex = new RegExp(error, 'g');
            // Replace all occurrences of the error with its corresponding correction
            correctedText = correctedText.replace(regex, commonErrors[error]);
        }
        // Remove all characters except Arabic letters, Arabic numbers, and spaces
        correctedText = correctedText.replace(/[^\u0621-\u064A0-9\s]/g, '');
        // Remove single Arabic digits (composed of a single digit)
        correctedText = correctedText.replace(/\b\d\b/g, '');
        // Remove single Arabic letters (composed of a single letter)
        correctedText = correctedText.replace(/\b[\u0621-\u064A]\b/g, '');
        //Add a line break before each specified term in the text
        const terms = [
            'الجمهورية التونسية',
            'بطاقة التعريف الوطنية',
            'اللقب',
            'الاسم',
            'حرم',
            'بنت',
            'بن',
            'تاريخ الولادة',
            'مكانها',
        ];
        // terms.forEach((term) => {
        //     correctedText = correctedText.replace(term, '\n$&');
        // });
        // Remove any extra line breaks at the beginning of the text
        correctedText = correctedText.replace(/^\n/, '');

        // Return the corrected text
        return correctedText;
    };

    // Function to handle image upload event
    const handleImageUpload = (event) => {
        // Get the selected image file from the event
        const file = event.target.files[0];

        // Set the selected image file to a state variable (e.g., setImageFile) for further use
        setImageFile(file);
    };

    const postProcessText = (recognizedText) => {
        const regex = /\b\d{8}\b/g; // Expression régulière pour détecter les nombres de 8 chiffres
        const processedText = recognizedText.replace(regex, '\n$&'); // Ajouter un caractère de retour à la ligne avant et après chaque nombre de 8 chiffres
        return processedText;
    };

    const displayRecognizedText = (recognizedText) => {
        const lines = recognizedText.split(/\n/);
        return lines.map((line, index) => <React.Fragment key={index}>{line}<br /></React.Fragment>);
    };

    const handleRecognition = async () => {
        if (!imageFile) {
            alert('Please select an image before starting the text recognition.');
            return;
        }

        setIsLoading(true);

        try {
            const result = await Tesseract.recognize(
                imageFile,
                'ara',
                { logger: info => console.log(info) } // Affiche les informations de progression dans la console.
            );

            const cleanedText = result.data.text.replace(/\s+/g, ' ');
            const correctedText = correctRecognizedText(cleanedText);
            //const processedText = postProcessText(correctedText);
            setRecognizedText(correctedText);
        } catch (error) {
            console.error('Error during text recognition:', error);
            alert('An error occurred during text recognition. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const [user, setUser] = useState({
        name: '',
        password: '&DEwmRf2HuL+reuJ',
        cin: '',
        address: '',
        email: '',
        role: 'client',
        region: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/user/register', user);
            console.log('Registrated successfully!');

            if (response.data && response.data.id) {
                const userId = response.data.id;
                window.location.href = `/cards/step-two?userId=${userId}`;
                await axios.post('http://localhost:3001/user/email', { email: user.email });
                console.log('Email sent successfully.');
            } else {
                console.error('Invalid response data');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <body className="g-sidenav-show  bg-gray-100">
        <Aside />
        <main className="main-content border-radius-lg">
            <div className="col-xl-10 mt-3" style={{ "margin-right": "auto", "margin-left": "auto" }}>
                <div className="row">
                    <div className="col-md-3 col-5">
                        <div className="card shadow-dark dark-version">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/client"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-blur text-center border-radius-lg">
                                        <TbSquareRoundedNumber1 size={55} className="text-white text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-wblack mb-0 mt-4">Integrate Client</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-two"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber2 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Place A Request</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/cards/step-three"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber3 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Pick A Number</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="col-md-3 col-5">
                        <div className="card">
                            <Link
                                className=" text-black font-weight-bold text-decoration-none"
                                to="/invoice"
                            >
                                <div className="card-header mx-4 p-3 text-center">
                                    <div className="icon icon-shape icon-lg shadow-dark text-center border-radius-lg">
                                        <TbSquareRoundedNumber4 size={55} className="text-dark-blue text-center mt-1" />
                                    </div>
                                </div>
                                <div className="card-body pt-0 p-3 text-center">
                                    <h6 className="text-center text-dark-blue mb-0 mt-4">Claim An Invoice</h6>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-header p-0 position-relative mt-n4 mx-7 z-index-2 mt-5">
                <div className="shadow-dark border-radius-lg pt-3 pb-2">
                    <h6 className="text-black text-capitalize ps-3">First Step: Scan The ID Card</h6>
                </div>
            </div>
            <div className="card card-plain justify-content-center mt-4 mx-3">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 mb-3 d-flex align-items-center">
                            <label htmlFor="imageUpload" className="form-label me-2">
                                Upload an Image:
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                id="imageUpload"
                                onChange={handleImageUpload}
                                className="form-control"
                            />
                            <button
                                onClick={handleRecognition}
                                disabled={!imageFile || isLoading}
                                className="btn btn-dark ms-2"
                            >
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    '✔'
                                )}
                            </button>
                        </div>

                        {imageFile && (
                            <div className="col-md-6 mb-3 d-flex justify-content-center">
                                <div className="selected-image-container dark-version">
                                    <h6 className="mb-2">Selected Image:</h6>
                                    <img
                                        src={URL.createObjectURL(imageFile)}
                                        alt="Selected Image"
                                        className="img-fluid border rounded"
                                        style={{ maxHeight: "200px" }}
                                    />
                                </div>
                            </div>
                        )}
                        {recognizedText && (
                            <div className="col-md-12 mt-4">
                                <h6 className="mb-2">Recognized Text:</h6>
                                <div className="border rounded p-3" style={{ direction: "rtl", fontFamily: "Arial, sans-serif", cursor: "default" }}>
                                    <h5 style={{ whiteSpace: "pre-line" }}>
                                        {displayRecognizedText(correctRecognizedText(recognizedText))}
                                    </h5>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="card-body mt-4" style={{ "margin-right": "150px", "margin-left": "150px" }}>
                        <form role="form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cin">CIN</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cin"
                                    name="cin"
                                    value={user.cin}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="region">Region</label>
                                <select
                                    className="form-control"
                                    id="region"
                                    name="region"
                                    value={user.region}
                                    onChange={handleChange}
                                >
                                    <option value="">Select a region</option>
                                    <option value="Tunis">Tunis</option>
                                    <option value="Ariana">Ariana</option>
                                    <option value="Ben Arous">Ben Arous</option>
                                    <option value="Manouba">Manouba</option>
                                    <option value="Nabeul">Nabeul</option>
                                    <option value="Zaghouan">Zaghouan</option>
                                    <option value="Bizerte">Bizerte</option>
                                    <option value="Béja">Béja</option>
                                    <option value="Jendouba">Jendouba</option>
                                    <option value="Kef">Kef</option>
                                    <option value="Siliana">Siliana</option>
                                    <option value="Sousse">Sousse</option>
                                    <option value="Monastir">Monastir</option>
                                    <option value="Mahdia">Mahdia</option>
                                    <option value="Sfax">Sfax</option>
                                    <option value="Kairouan">Kairouan</option>
                                    <option value="Kasserine">Kasserine</option>
                                    <option value="Sidi Bouzid">Sidi Bouzid</option>
                                    <option value="Gabès">Gabès</option>
                                    <option value="Medenine">Medenine</option>
                                    <option value="Tataouine">Tataouine</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="address"
                                    value={user.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="d-flex align-items-center justify-content-between" style={{ "float": "right", "margin-right": "60px" }}>
                                <button type="submit" className="btn btn-dark shadow-dark mt-2">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>


        </body>
    );
};

export default UserScann;
