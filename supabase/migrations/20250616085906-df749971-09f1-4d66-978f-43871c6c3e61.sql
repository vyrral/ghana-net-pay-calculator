
-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Profiles table policies - users can only access their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Prompt answers policies - users can only access their own answers
CREATE POLICY "Users can view their own prompt answers" 
  ON public.prompt_answers 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own prompt answers" 
  ON public.prompt_answers 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own prompt answers" 
  ON public.prompt_answers 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own prompt answers" 
  ON public.prompt_answers 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Prompts table policies - these appear to be public prompts that everyone can read
CREATE POLICY "Anyone can view prompts" 
  ON public.prompts 
  FOR SELECT 
  TO authenticated, anon
  USING (true);

-- Reports table policies - appears to be public outage/status reports
CREATE POLICY "Anyone can view reports" 
  ON public.reports 
  FOR SELECT 
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create reports" 
  ON public.reports 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reports" 
  ON public.reports 
  FOR UPDATE 
  TO authenticated
  USING (true);
