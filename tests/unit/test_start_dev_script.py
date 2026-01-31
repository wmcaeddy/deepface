import os
import stat
import unittest

class TestStartDevScript(unittest.TestCase):
    def test_start_dev_script_exists_and_executable(self):
        script_path = "scripts/start-dev.sh"
        self.assertTrue(os.path.exists(script_path), f"{script_path} does not exist")
        
        # Check execution permission
        st = os.stat(script_path)
        self.assertTrue(bool(st.st_mode & stat.S_IXUSR), f"{script_path} is not executable")

if __name__ == "__main__":
    unittest.main()
