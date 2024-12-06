import { supabase } from "../../lib/supabaseClient.js";

export default async function setSingleGuestRsvp(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { id, rsvp } = req.body;
  console.log(req.body);
  if (id === undefined || rsvp === undefined) {
    res.status(400).json({ message: 'Bad Request: Missing guest ID or RSVP status' });
    return;
  }

  const { status, error } = await supabase
    .from('rsvp')
    .update({ rsvp: rsvp })
    .eq('id', id);

  if (error) {
    console.error('Error in `setSingleGuestRsvp`:', error);
    res.status(500).json({ message: 'Internal Server Error' });
    return;
  }
  if (status < 200 || status >= 300) {
    res.status(status).json({ message: 'Failed to update RSVP' });
    return;
  }
  res.status(200).json({ message: 'RSVP updated successfully' });
}