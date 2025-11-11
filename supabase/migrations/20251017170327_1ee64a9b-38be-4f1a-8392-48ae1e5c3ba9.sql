-- Add user contact information fields to reservations table
ALTER TABLE public.reservations 
ADD COLUMN user_name TEXT,
ADD COLUMN user_email TEXT,
ADD COLUMN user_phone TEXT;

COMMENT ON COLUMN public.reservations.user_name IS 'Name of the person making the reservation';
COMMENT ON COLUMN public.reservations.user_email IS 'Email of the person making the reservation';
COMMENT ON COLUMN public.reservations.user_phone IS 'Phone number of the person making the reservation (optional)';