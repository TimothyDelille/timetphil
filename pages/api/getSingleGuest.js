import { supabase } from "../../lib/supabaseClient.js";

export default async function getSingleGuest(req, res) {
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }

    const guestId = req.query.id;
    const { data, error } = await supabase
        .from('rsvp')
        .select('id, name, rsvp')
        .eq('id', guestId)
        .single();

    if (error) {
        console.error('Error in `getSingleGuest`:', error);
        res.status(500).json({ message: 'Internal Server Error' });
        return;
    }
    if (data) {
        return res.status(200).json({ guest: data });
    }
    res.status(404).json({ message: 'Guest not found' });
}