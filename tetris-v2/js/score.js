var json = [{ "id": "5001", "type": "None" },
            { "id": "5002", "type": "Glazed" },
            { "id": "5005", "type": "Sugar" },
            { "id": "5003", "type": "Chocolate" },
            { "id": "5004", "type": "Maple" },
            { "id": "5009", "type": "Juice" }];
/**
 * The function searches over the array by certain field value,
 * and replaces occurences with the parameter provided.
 *
 * @param string field Name of the object field to compare
 * @param string oldvalue Value to compare against
 * @param string newvalue Value to replace mathes with
 */
function replaceByValue( field, oldvalue, newvalue ) {
    for( var k = 0; k < json.length; ++k ) {
        if( oldvalue == json[k][field] ) {
            json[k][field] = newvalue ;
        }
    }
    return json;
}
