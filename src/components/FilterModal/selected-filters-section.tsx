import { Fragment } from "react";
import SectionHeader from "./section-header";
import SectionDivider from "./section-divider";
import SelectedFilter from "./selected-filter";

type SelectedFilterType = {
  label: string;
  onRemove: () => void;
};

export default function SelectedFiltersSection({
  selectedFilters,
}: {
  selectedFilters: SelectedFilterType[];
}) {
  return (
    <Fragment>
      <SectionHeader title="Selected" />
      <div className="flex flex-wrap mb-4">
        {selectedFilters.map((filter, index) => (
          <SelectedFilter
            key={index}
            label={filter.label}
            onRemove={filter.onRemove}
          />
        ))}
      </div>
      <SectionDivider />
    </Fragment>
  );
}
