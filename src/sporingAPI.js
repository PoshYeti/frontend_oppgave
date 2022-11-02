import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';

const apiURL = "https://tracking.bring.com/api/tracking.json?q=TESTPACKAGEATPICKUPPOINT";

const SporingAPI = () => {
	const [data, setData] = useState(null);
    const [isDone, setDone] = useState(false)

	useEffect(() => {     
    const getData = async () => {  
        await axios.get(apiURL)  
            .then(res => {  
                setDone(true);
                setData(res.data); 
            })  
            .catch(err => {  
                console.log(err);
            });  
        }  
    getData()  
    }, [])

    return (
        <div>     
            {isDone && data && 
                <div>
                    {data.consignmentSet.map((consignment, i) => 
                        <Grid container key={i}> 
                            <Grid container>
                                <Grid item xs={12}>
                                    <h1>Result!</h1>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <p><b>Consignment id</b> - {consignment.consignmentId}</p>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <p><b>Sender reference</b> - {consignment.senderReference}</p>
                                </Grid>
                            </Grid>
                            {consignment.packageSet.map((pkg, j) =>
                            <Grid container style={{backgroundColor: "#fff5f0"}} key={j}>
                                <Grid container style={{margin: "1em"}}>
                                    <Grid item xs={12}>
                                        <b>Latest status</b>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <p dangerouslySetInnerHTML={ {__html: pkg.statusDescription} } />
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{marginTop: "2em"}}>
                                        <b>Package number</b>
                                        <p>{pkg.packageNumber}</p>
                                        <b>Product</b>
                                        <p>{pkg.productName}</p>
                                    </Grid>
                                    <Grid item xs={12} sm={6} style={{marginTop: "2em"}}>
                                        <b>Size</b>
                                        <p>{pkg.lengthInCm}cm x {pkg.widthInCm}cm x {pkg.heightInCm}cm ({pkg.volumeInDm3} dm<sup>3</sup>)</p>
                                        <b>Weight</b>
                                        <p>{pkg.weightInKgs} (kg)</p>
                                    </Grid>
                                </Grid>
                                <Grid container style={{margin: "1em"}}>
                                    <Grid item xs={12} sm={6}>
                                        <h3>Sender</h3>
                                        <address>
                                            <p>{pkg.senderName}</p>
                                            <p>{pkg.senderAddress.addressLine1}</p>
                                            <p>{pkg.senderAddress.postalCode} {pkg.senderAddress.city}</p>
                                            <p>{pkg.senderAddress.country}</p>
                                        </address>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>   
                                        <h3>Recipient</h3>
                                        <address>
                                            <p>{pkg.recipientHandlingAddress.addressLine1}</p>
                                            <p>{pkg.recipientHandlingAddress.postalCode} {pkg.recipientHandlingAddress.city}</p>
                                            <p>{pkg.recipientHandlingAddress.country}</p>
                                        </address>
                                    </Grid>
                                </Grid>
                                {pkg.eventSet.map((event, k) => 
                                    <Grid container style={{margin: "1em"}} key={k}>
                                        <Grid container alignItems="flex-end">
                                            <Grid item xs={12} sm={6}>
                                                <p><b>{event.city}</b> {event.displayDate}</p>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <p dangerouslySetInnerHTML={ {__html: event.description} } />
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <p style={{border: "0 none #ccc", borderTop: "2px solid #ccc", marginTop: "-0.75em"}}>{event.displayTime}</p>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                            )}
                        </Grid>
                    )}
                </div>
            }
        </div>
    )
}

export default SporingAPI;