import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export interface Option {
  displayName: string;
  value: string;
}

interface SelectProps {
  options?: Option[];
  onChange?: any;
  selectedOptions?: string;
}

export const CategorySelect = ({
  options = [],
  onChange,
  selectedOptions = "",
}: SelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    onChange?.(value);
  };

  return (
    <div className={"select"}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="category-label">
          <div style={{ color: "white" }}>Category</div>
        </InputLabel>
        <Select
          style={{ color: "white" }}
          labelId="category-label"
          value={selectedOptions}
          onChange={handleChange}
          input={<OutlinedInput label="Category" />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.displayName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
