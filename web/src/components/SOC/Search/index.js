import React, { Component } from 'react';
import './style.css';

class Search extends Component {
    render() {
        return (
            <div className="box">
                {/* General Education (Breadth) */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">General Education (Breadth)</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="Breadth" value={this.props.searchParams.Breadth} onChange={this.props.onChange}>
                                        <option value="ANY">Do not filter for General Education (GE) categories</option>
                                        <option value="GE-1A">GE Ia: Lower Division Writing</option>
                                        <option value="GE-1B">GE Ib: Upper Division Writing</option>
                                        <option value="GE-2">GE II: Science and Technology</option>
                                        <option value="GE-3">GE III: Social and Behavioral Sciences</option>
                                        <option value="GE-4">GE IV: Arts and Humanities</option>
                                        <option value="GE-5A">GE Va: Quantitative Literacy (starting Fall 2012)</option>
                                        <option value="GE-5B">GE Vb: Formal Reasoning (starting Fall 2012)</option>
                                        <option value="GE-6">GE VI: Language other than English</option>
                                        <option value="GE-7">GE VII: Multicultural Studies</option>
                                        <option value="GE-8">GE VIII: International/Global Issues</option>
                                        <option value="ANY" style={{ color: "brown" }}>&nbsp;&nbsp;&nbsp;&nbsp;--- General Education category (prior to Fall 2012) ---</option>
                                        <option value="GE-5" style={{ color: "#555" }}>GE V: Quantitative, Symbolic, and Computational Reasoning</option>
                                        <option value="ANY" style={{ color: "brown" }}>&nbsp;&nbsp;&nbsp;&nbsp;--- General Education category (prior to Fall 2011) ---</option>
                                        <option value="GE-9" style={{ color: "#555" }}>GE IX: Laboratory or Performance</option>
                                        <option value="ANY" style={{ color: "brown" }}>&nbsp;&nbsp;&nbsp;&nbsp;--- Breadth categories (prior to Fall 2008) ---</option>
                                        <option value="1A" style={{ color: "#555" }}>Breadth Ia: Lower Division Writing</option>
                                        <option value="1B" style={{ color: "#555" }}>Breadth Ib: Upper Division Writing</option>
                                        <option value="2" style={{ color: "#555" }}>Breadth II: Natural Sciences</option>
                                        <option value="3" style={{ color: "#555" }}>Breadth III: Social and Behavioral Sciences</option>
                                        <option value="4" style={{ color: "#555" }}>Breadth IV: Humanistic Inquiry</option>
                                        <option value="5" style={{ color: "#555" }}>Breadth V: Mathematics and Symbolic Systems</option>
                                        <option value="6" style={{ color: "#555" }}>Breadth VI: Language Other Than English</option>
                                        <option value="7A" style={{ color: "#555" }}>Breadth VIIa: Multicultural Studies</option>
                                        <option value="7B" style={{ color: "#555" }}>Breadth VIIb: International/global Issues</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Department Name */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Department Name</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="Dept" value={this.props.searchParams.Dept} onChange={this.props.onChange}>
                                        <option value="ALL">Include All Departments</option>
                                        <option value="AC ENG">AC ENG . . . . . .Academic English and ESL (started 2012 Fall)</option>
                                        <option value="AFAM">AFAM . . . . . . . African American Studies</option>
                                        <option value="ANATOMY">ANATOMY . . . .Anatomy and Neurobiology</option>
                                        <option value="ANESTH">ANESTH . . . . . Anesthesiology</option>
                                        <option value="ANTHRO">ANTHRO . . . . . Anthropology</option>
                                        <option value="ARABIC">ARABIC . . . . . .Arabic</option>
                                        <option value="ART">ART . . . . . . . . .Art (started 2013 Fall)</option>
                                        <option value="ART HIS">ART HIS . . . . . .Art History</option>
                                        <option style={{ color: "gray" }} value="ART STU">ART STU . . . . . Art (until 2013 FSm)</option>
                                        <option value="ARTS">ARTS . . . . . . . Arts</option>
                                        <option value="ARTSHUM">ARTSHUM . . . . Arts and Humanities</option>
                                        <option value="ASIANAM">ASIANAM . . . . Asian American Studies</option>
                                        <option value="BANA">BANA . . . . . . . Business Analytics (started 2017 SS2)</option>
                                        <option value="BATS">BATS . . . . . . . Biomedical and Translational Science (started 2012 Fall)</option>
                                        <option value="BIO SCI">BIO SCI . . . . . .Biological Sciences</option>
                                        <option value="BIOCHEM">BIOCHEM . . . . Biological Chemistry</option>
                                        <option value="BME">BME . . . . . . . . Biomedical Engineering</option>
                                        <option style={{ color: "gray" }} value="BSEMD">BSEMD . . . . . .Bio Sci &amp; Educational Media Design (until 2017 Wtr)</option>
                                        <option value="CAMPREC">CAMPREC . . . .Campus Recreation</option>
                                        <option value="CBEMS">CBEMS . . . . . .Chemical Engr and Materials Science</option>
                                        <option value="CEM">CEM . . . . . . . . Community and Environmental Medicine</option>
                                        <option value="CHC/LAT">CHC/LAT . . . . . Chicano Latino</option>
                                        <option value="CHEM">CHEM . . . . . . .Chemistry</option>
                                        <option value="CHINESE">CHINESE . . . . .Chinese</option>
                                        <option value="CLASSIC">CLASSIC . . . . .Classics</option>
                                        <option value="CLT&amp;THY">CLT&amp;THY . . . . .Culture &amp; Theory</option>
                                        <option value="COGS">COGS . . . . . . . Cognitive Sciences  (started 2016 Fall)</option>
                                        <option value="COM LIT">COM LIT . . . . . Comparative Literature</option>
                                        <option value="COMPSCI">COMPSCI . . . . Computer Science</option>
                                        <option value="CRITISM">CRITISM . . . . . Criticism</option>
                                        <option value="CRM/LAW">CRM/LAW . . . . Criminology, Law and Society</option>
                                        <option value="CSE">CSE . . . . . . . . Computer Science and Engineering</option>
                                        <option value="DANCE">DANCE . . . . . . Dance</option>
                                        <option value="DERM">DERM . . . . . . .Dermatology</option>
                                        <option value="DEV BIO">DEV BIO . . . . . Developmental and Cell Biology</option>
                                        <option value="DRAMA">DRAMA . . . . . .Drama</option>
                                        <option value="E ASIAN">E ASIAN . . . . . East Asian Languages and Literatures</option>
                                        <option value="EARTHSS">EARTHSS . . . . Earth System Science</option>
                                        <option value="ECO EVO">ECO EVO . . . . Ecology and Evolutionary Biology</option>
                                        <option value="ECON">ECON . . . . . . . Economics</option>
                                        <option value="ECPS">ECPS . . . . . . . Embedded and Cyber-Physical Systems (started 2014 Spg)</option>
                                        <option value="ED AFF">ED AFF . . . . . .Educational Affairs (Sch of Med)</option>
                                        <option value="EDUC">EDUC . . . . . . . Education</option>
                                        <option value="EECS">EECS . . . . . . . Electrical Engineering &amp; Computer Science</option>
                                        <option value="EHS">EHS . . . . . . . . Environmental Health Sciences (started 2013 Fall)</option>
                                        <option value="ENGLISH">ENGLISH . . . . .English</option>
                                        <option value="ENGR">ENGR . . . . . . . Engineering</option>
                                        <option value="ENGRCEE">ENGRCEE . . . .Engineering, Civil and Environmental</option>
                                        <option value="ENGRMAE">ENGRMAE . . . .Engineering, Mechanical and Aerospace</option>
                                        <option value="ENGRMSE">ENGRMSE . . . .Chemical Engr and Materials Science (grads)</option>
                                        <option value="EPIDEM">EPIDEM . . . . . .Epidemiology</option>
                                        <option value="ER MED">ER MED . . . . . Emergency Medicine</option>
                                        <option value="EURO ST">EURO ST . . . . .European Studies</option>
                                        <option value="FAM MED">FAM MED . . . . Family Medicine</option>
                                        <option value="FIN">FIN . . . . . . . . . Finance (started 2017 Fall)</option>
                                        <option value="FLM&amp;MDA">FLM&amp;MDA . . . .Film and Media Studies</option>
                                        <option value="FRENCH">FRENCH . . . . . French</option>
                                        <option value="GEN&amp;SEX">GEN&amp;SEX . . . . Gender and Sexuality Studies (started 2014 Fall)</option>
                                        <option value="GERMAN">GERMAN . . . . .German</option>
                                        <option value="GLBL ME">GLBL ME . . . . .Global Middle East Studies (started 2016 Fall)</option>
                                        <option value="GLBLCLT">GLBLCLT . . . . .Global Cultures</option>
                                        <option value="GREEK">GREEK . . . . . . Greek</option>
                                        <option value="HEBREW">HEBREW . . . . .Hebrew</option>
                                        <option value="HINDI">HINDI . . . . . . . .Hindi</option>
                                        <option value="HISTORY">HISTORY . . . . .History</option>
                                        <option value="HUMAN">HUMAN . . . . . .Humanities</option>
                                        <option value="HUMARTS">HUMARTS . . . . Humanities and Arts</option>
                                        <option value="I&amp;C SCI">I&amp;C SCI . . . . . . Information and Computer Science</option>
                                        <option value="IN4MATX">IN4MATX . . . . . Informatics</option>
                                        <option value="INT MED">INT MED . . . . . Internal Medicine</option>
                                        <option value="INTL ST">INTL ST . . . . . . International Studies</option>
                                        <option value="ITALIAN">ITALIAN . . . . . .Italian</option>
                                        <option value="JAPANSE">JAPANSE . . . . Japanese</option>
                                        <option value="KOREAN">KOREAN . . . . .Korean</option>
                                        <option value="LATIN">LATIN . . . . . . . Latin</option>
                                        <option value="LAW">LAW . . . . . . . . Law</option>
                                        <option value="LINGUIS">LINGUIS . . . . . .Linguistics</option>
                                        <option value="LIT JRN">LIT JRN . . . . . . Literary Journalism</option>
                                        <option value="LPS">LPS . . . . . . . . .Logic and Philosophy of Science</option>
                                        <option value="M&amp;MG">M&amp;MG . . . . . . .Microbiology and Molecular Genetics</option>
                                        <option value="MATH">MATH . . . . . . . Mathematics</option>
                                        <option value="MED">MED . . . . . . . . Medicine</option>
                                        <option value="MED ED">MED ED . . . . . Medical Education</option>
                                        <option value="MED HUM">MED HUM . . . . Medical Humanities (started 2016 Fall)</option>
                                        <option value="MGMT">MGMT . . . . . . .Management</option>
                                        <option value="MGMT EP">MGMT EP . . . . Executive MBA</option>
                                        <option value="MGMT FE">MGMT FE . . . . Fully Employed MBA</option>
                                        <option value="MGMT HC">MGMT HC . . . . Health Care MBA</option>
                                        <option value="MGMTMBA">MGMTMBA . . . Management MBA</option>
                                        <option value="MGMTPHD">MGMTPHD . . . .Management PhD</option>
                                        <option value="MIC BIO">MIC BIO . . . . . .Microbiology</option>
                                        <option value="MOL BIO">MOL BIO . . . . . Molecular Biology and Biochemistry</option>
                                        <option value="MPAC">MPAC . . . . . . .Accounting (started 2013 SS1)</option>
                                        <option value="MUSIC">MUSIC . . . . . . .Music</option>
                                        <option value="NET SYS">NET SYS . . . . .Networked Systems</option>
                                        <option value="NEURBIO">NEURBIO . . . . .Neurobiology and Behavior</option>
                                        <option value="NEUROL">NEUROL . . . . . Neurology</option>
                                        <option value="NUR SCI">NUR SCI . . . . . Nursing Science</option>
                                        <option value="OB/GYN">OB/GYN . . . . . Obstetrics and Gynecology</option>
                                        <option value="OPHTHAL">OPHTHAL . . . . Ophthalmology</option>
                                        <option value="PATH">PATH . . . . . . . Pathology and Laboratory Medicine</option>
                                        <option value="PED GEN">PED GEN . . . . Pediatrics Genetics</option>
                                        <option value="PEDS">PEDS . . . . . . . Pediatrics</option>
                                        <option value="PERSIAN">PERSIAN . . . . .Persian</option>
                                        <option value="PHARM">PHARM . . . . . .Medical Pharmacology</option>
                                        <option value="PHILOS">PHILOS . . . . . .Philosophy</option>
                                        <option value="PHRMSCI">PHRMSCI . . . . Pharmaceutical Sciences</option>
                                        <option value="PHY SCI">PHY SCI . . . . . Physical Science</option>
                                        <option value="PHYSICS">PHYSICS . . . . .Physics</option>
                                        <option value="PHYSIO">PHYSIO . . . . . .Physiology and Biophysics</option>
                                        <option value="PLASTIC">PLASTIC . . . . . Plastic Surgery (started 2014 Fall)</option>
                                        <option value="PM&amp;R">PM&amp;R . . . . . . .Physical Medicine and Rehabilitation</option>
                                        <option value="POL SCI">POL SCI . . . . . Political Science</option>
                                        <option value="PORTUG">PORTUG . . . . . Portuguese</option>
                                        <option value="PP&amp;D">PP&amp;D . . . . . . . Planning, Policy, and Design</option>
                                        <option value="PSY BEH">PSY BEH . . . . .Psychology and Social Behavior</option>
                                        <option value="PSYCH">PSYCH . . . . . . Psychology</option>
                                        <option value="PUB POL">PUB POL . . . . .Public Policy (started 2013 Wtr)</option>
                                        <option value="PUBHLTH">PUBHLTH . . . . Public Health</option>
                                        <option style={{ color: "gray" }} value="RAD SCI">RAD SCI . . . . . Radiological Sciences (until 2012 Spg)</option>
                                        <option value="RADIO">RADIO . . . . . . .Radiology</option>
                                        <option value="REL STD">REL STD . . . . . Religious Studies</option>
                                        <option value="ROTC">ROTC . . . . . . . Reserve Officers' Training Corps</option>
                                        <option value="RUSSIAN">RUSSIAN . . . . .Russian</option>
                                        <option value="SOC SCI">SOC SCI . . . . . Social Science</option>
                                        <option value="SOCECOL">SOCECOL . . . . Social Ecology</option>
                                        <option value="SOCIOL">SOCIOL . . . . . .Sociology</option>
                                        <option value="SPANISH">SPANISH . . . . .Spanish</option>
                                        <option value="SPPS">SPPS . . . . . . . Social Policy &amp; Public Service (started 2016 Wtr)</option>
                                        <option value="STATS">STATS . . . . . . .Statistics</option>
                                        <option value="SURGERY">SURGERY . . . .Surgery</option>
                                        <option value="TAGALOG">TAGALOG . . . . Tagalog</option>
                                        <option value="TOX">TOX . . . . . . . . .Toxicology</option>
                                        <option value="UCDC">UCDC . . . . . . . UC Washington DC</option>
                                        <option value="UNI AFF">UNI AFF . . . . . .University Affairs</option>
                                        <option value="UNI STU">UNI STU . . . . . .University Studies</option>
                                        <option value="VIETMSE">VIETMSE . . . . .Vietnamese</option>
                                        <option value="VIS STD">VIS STD . . . . . .Visual Studies</option>
                                        <option style={{ color: "gray" }} value="WOMN ST">WOMN ST . . . . Women's Studies (until 2014 SS2)</option>
                                        <option value="WRITING">WRITING . . . . . Writing</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Number or Range */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Course Number or Range</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="CourseNum" className="input is-small" type="text" value={this.props.searchParams.CourseNum} onChange={this.props.onChange} />
                            </div>
                            <p className="help">H2A, 5, 10-20 (multiple entries ok)</p>
                        </div>
                    </div>
                </div>

                {/* Course Level */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Course Level</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="Division" value={this.props.searchParams.Division} onChange={this.props.onChange}>
                                        <option value="ANY">Any course division</option>
                                        <option value="0xx">Lower Division only</option>
                                        <option value="1xx">Upper Division only</option>
                                        <option value="2xx">Graduate/Professional only</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Code or Range */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Course Code or Range</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="CourseCodes" className="input is-small" type="text" value={this.props.searchParams.CourseCodes} onChange={this.props.onChange} />
                            </div>
                            <p className="help">14200, 29000-29100</p>
                        </div>
                    </div>
                </div>

                {/* Instructor */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Instructor</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="InstrName" className="input is-small" type="text" value={this.props.searchParams.InstrName} onChange={this.props.onChange} />
                            </div>
                            <p className="help">Smith</p>
                        </div>
                    </div>
                </div>

                {/* Course Title Contains */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Course Title Contains</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="CourseTitle" className="input is-small" type="text" value={this.props.searchParams.CourseTitle} onChange={this.props.onChange} />
                            </div>
                            <p className="help">protein</p>
                        </div>
                    </div>
                </div>

                {/* Course Type */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Course Type</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="ClassType" value={this.props.searchParams.ClassType} onChange={this.props.onChange}>
                                        <option value="ALL">All Course Types</option>
                                        <option value="ACT">Activity</option>
                                        <option value="COL">Colloquium</option>
                                        <option value="DIS">Discussion</option>
                                        <option value="FLD">Field Work</option>
                                        <option value="LAB">Laboratory</option>
                                        <option value="LEC">Lecture</option>
                                        <option value="QIZ">Quiz</option>
                                        <option value="RES">Research</option>
                                        <option value="SEM">Seminar</option>
                                        <option value="STU">Studio</option>
                                        <option value="TAP">Tut Assist Prog</option>
                                        <option value="TUT">Tutorial</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Units */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Units</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="Units" className="input is-small" type="text" value={this.props.searchParams.Units} onChange={this.props.onChange} />
                            </div>
                            <p className="help">4,5, or VAR</p>
                        </div>
                    </div>
                </div>

                {/* Days */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Days</label>
                    </div>
                    <div className="field-body">
                        <div className="field is-grouped">
                            <div className="control">
                                <input name="Days" className="input is-small" type="text" value={this.props.searchParams.Days} onChange={this.props.onChange} />
                            </div>
                            <p className="help">MWF,TuTh,W (courses will include all days specified)</p>
                        </div>
                    </div>
                </div>

                {/* Starting Time After */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Starting Time After</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="StartTime" value={this.props.searchParams.StartTime} onChange={this.props.onChange}>
                                        <option></option>
                                        <option>1:00am</option>
                                        <option>2:00am</option>
                                        <option>3:00am</option>
                                        <option>4:00am</option>
                                        <option>5:00am</option>
                                        <option>6:00am</option>
                                        <option>7:00am</option>
                                        <option>8:00am</option>
                                        <option>9:00am</option>
                                        <option>10:00am</option>
                                        <option>11:00am</option>
                                        <option>12:00pm</option>
                                        <option>1:00pm</option>
                                        <option>2:00pm</option>
                                        <option>3:00pm</option>
                                        <option>4:00pm</option>
                                        <option>5:00pm</option>
                                        <option>6:00pm</option>
                                        <option>7:00pm</option>
                                        <option>8:00pm</option>
                                        <option>9:00pm</option>
                                        <option>10:00pm</option>
                                        <option>11:00pm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ending Time After */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Ending Time After</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="EndTime" value={this.props.searchParams.EndTime} onChange={this.props.onChange}>
                                        <option></option>
                                        <option>2:00am</option>
                                        <option>3:00am</option>
                                        <option>4:00am</option>
                                        <option>5:00am</option>
                                        <option>6:00am</option>
                                        <option>7:00am</option>
                                        <option>8:00am</option>
                                        <option>9:00am</option>
                                        <option>10:00am</option>
                                        <option>11:00am</option>
                                        <option>12:00pm</option>
                                        <option>1:00pm</option>
                                        <option>2:00pm</option>
                                        <option>3:00pm</option>
                                        <option>4:00pm</option>
                                        <option>5:00pm</option>
                                        <option>6:00pm</option>
                                        <option>7:00pm</option>
                                        <option>8:00pm</option>
                                        <option>9:00pm</option>
                                        <option>10:00pm</option>
                                        <option>11:00pm</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Full Option */}
                <div className="field is-horizontal">
                    <div className="field-label is-small">
                        <label className="label">Courses Full Option</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <div className="select is-small">
                                    <select name="FullCourses" value={this.props.searchParams.FullCourses} onChange={this.props.onChange}>
                                        <option value="ANY"></option>
                                        <option value="SkipFullWaitlist">Include full courses if space on waitlist</option>
                                        <option value="SkipFull">Skip courses that are full</option>
                                        <option value="FullOnly">Show only full or waitlisted courses</option>
                                        <option value="OverEnrolled">Show only courses that are over-enrolled</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search Button */}
                <div className="field is-horizontal">
                    <div className="field-label">
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <button className={"button is-primary is-medium" + (this.props.isSearching ? ' is-loading' : '')} onClick={this.props.onSearch}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;
