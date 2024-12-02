import { supabase } from "../../lib/supabaseClient.js";

export default async function getAllGuests(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const { data, error } = await supabase
        .from('rsvp')
        .select('id, name, rsvp');
    
    if (error) {
        console.error('Error in `getAllGuests`:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
    if (data) {
        return res.status(200).json({ guests: data });
    }
    res.status(404).json({ message: 'Guests not found' });
}