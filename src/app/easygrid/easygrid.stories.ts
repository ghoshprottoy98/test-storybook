import type { Meta, StoryObj } from '@storybook/angular';
import { EasygridComponent } from './easygrid.component';
import { moduleMetadata } from '@storybook/angular';
import { EasyGridModule } from '../shared/easy-grid/src/public-api';

const meta: Meta<EasygridComponent> = {
  title: 'Components/Easygrid',
  component: EasygridComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [EasyGridModule],
    }),
  ],
};

export default meta;

type Story = StoryObj<EasygridComponent>;

export const Basic: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition:true , sortable: false, resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition:true , sortable: false, resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition:true , sortable: false, resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with a predefined set of static data and column definitions.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Action: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' , lockPosition:true , sortable: false , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type' , lockPosition:true , sortable: false , resizable: false} ,
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition:true , sortable: false , resizable: false},
      {
        colId: '__action',
        type: 'actionColumn',
        cellRendererParams: {
          actions: [
            {
              title: 'Remove',
              icon: 'fa-trash',
              iconOnly: false,
              class: 'danger'
            },
            {
              id: 'download_bulk',
              title: 'Download XLSX',
              icon: 'fa-download',
              iconOnly: true,
              bulk: {
                mode: 'filter',
                url: false
              }
            }
          ]
        },
        width: 150
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with an action column that includes actions like Remove and Download buttons.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Pagination: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' , lockPosition:true , sortable: false , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition:true  , sortable: false , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer' , lockPosition:true , sortable: false , resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Assignment', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'English Essay', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Physics Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Biology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Chemistry Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Computer Science Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Art Assignment', assessmentType: 'Assignment', isActive: true },
      { assessmentName: 'Music Test', assessmentType: 'Test', isActive: false },
      { assessmentName: 'Drama Rehearsal', assessmentType: 'Performance', isActive: true },
      { assessmentName: 'Economics Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Philosophy Essay', assessmentType: 'Essay', isActive: true },
      { assessmentName: 'Sociology Quiz', assessmentType: 'Quiz', isActive: false },
      { assessmentName: 'Geography Test', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Psychology Assignment', assessmentType: 'Assignment', isActive: false },
      { assessmentName: 'Statistics Homework', assessmentType: 'Homework', isActive: true },
      { assessmentName: 'Engineering Lab', assessmentType: 'Experiment', isActive: true },
      { assessmentName: 'Astronomy Project', assessmentType: 'Project', isActive: false },
      { assessmentName: 'Environmental Science Test', assessmentType: 'Test', isActive: true },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      [pagination]="true" 
      autoSizeColumnsToFit="size">
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with pagination enabled. Users can change the number of items displayed per page and change the page number to view data on different pages.',
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            [pagination]="true" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const Filter: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', filter: 'agTextColumnFilter', lockPosition:true , sortable: false , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', filter: 'agTextColumnFilter' , lockPosition:true , sortable: false , resizable: false},
      { headerName: 'Active', field: 'isActive', filter: 'selectFilter', cellRenderer: 'booleanCellRenderer', lockPosition:true , sortable: false , resizable: false} ,
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with filter options enabled. Users can filter data using different options to view specific subsets of data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnMoving: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name' , sortable: false , resizable: false },
      { field: 'assessmentType', headerName: 'Assessment Type' , sortable: false  , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer' , sortable: false , resizable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column moving enabled. Users can dynamically rearrange the order of columns by dragging and dropping headers to customize their view of the data.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};
export const ColumnResizing: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', width: 200 , lockPosition:true , sortable: false },
      { field: 'assessmentType', headerName: 'Assessment Type',  width: 200 , lockPosition:true , sortable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', width: 150, lockPosition:true , sortable: false},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column resizing enabled. Users can adjust the width of columns by dragging the edges of the column headers to fit their data or personal preferences.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnType: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', sortable: false, lockPosition:true, resizable: false },
      { 
        field: 'assessmentType', 
        headerName: 'Assessment Type', 
        cellStyle: { backgroundColor: '#71797E' },
        sortable: false, 
        resizable: false,
        lockPosition:true 
      },
      { 
        headerName: 'Active', 
        field: 'isActive', 
        cellRenderer: 'booleanCellRenderer', 
        sortable: false, 
        resizable: false,
        lockPosition:true 
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with the Assessment Type column shaded. The background color of the Assessment Type column is set for visual distinction.',
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnPinning: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', pinned: 'left'},
      { field: 'assessmentType', headerName: 'Assessment Type', pinned: 'left'},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', pinned: 'right'},
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with column pinning functionality. The "Assessment Name" and "Assessment Type" columns are pinned to the left, ensuring they remain visible while users scroll through the grid. The "Active" column is pinned to the right, providing quick access to the status of each assessment. This layout enhances the usability of the grid by allowing users to maintain context on key information as they navigate through the data.'
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnGroupPinning: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', pinned: 'left', lockPinned:true },
      { 
        field: 'assessmentType', 
        headerName: 'Assessment Type', 
        pinned: 'left',
        lockPinned:true 
      },
      { 
        headerName: 'Active', 
        field: 'isActive', 
        cellRenderer: 'booleanCellRenderer', 
        pinned: 'right',
        lockPinned:true  
      }
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with column pinning functionality, where all columns are locked in their pinned positions. The "Assessment Name" and "Assessment Type" columns are pinned to the left, ensuring they remain visible while users scroll through the data. The "Active" column is pinned to the right for easy access to status information. This configuration enhances usability by keeping essential data in view, facilitating better navigation and interaction with the grid.'
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const ColumnSpanning: Story = {
  args: {
    columnDefs: [
      { 
        field: 'country', 
        headerName: 'Country', 
        sortable: true, 
        lockPosition: true 
      },
      { 
        field: 'age', 
        headerName: 'Age', 
        colSpan: (params) => {
          const country = params.data.country;
          if (country === "Russia") {
            return 2; // Russia spans 2 columns
          } else if (country === "United States") {
            return 4; // United States spans 4 columns
          } else {
            return 1; // Other countries occupy 1 column
          }
        },
        lockPosition: true 
      },
      { 
        field: 'city', 
        headerName: 'City', 
        lockPosition: true 
      },
      { 
        field: 'population', 
        headerName: 'Population', 
        lockPosition: true 
      }
    ],
    dataSource: [
      { country: 'Russia', age: 35, city: 'Moscow', population: 11920000 },
      { country: 'United States', age: 30, city: 'New York', population: 8419000 },
      { country: 'Germany', age: 28, city: 'Berlin', population: 3769000 },
      { country: 'France', age: 22, city: 'Paris', population: 2148000 },
      { country: 'United States', age: 40, city: 'Los Angeles', population: 3971000 },
      { country: 'Russia', age: 50, city: 'Saint Petersburg', population: 5384000 },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with column spanning functionality. The "Age" column dynamically spans multiple columns based on the country of the corresponding row. For rows where the country is "Russia," the "Age" column spans 2 columns, while for "United States," it spans 4 columns. For all other countries, it occupies a single column. This feature enhances the visual representation of data by grouping related information together, improving readability and organization within the grid.'
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="dataSource" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowSorting: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', sortable: true , lockPosition:true , resizable: false},
      { field: 'assessmentType', headerName: 'Assessment Type', sortable: true , lockPosition:true , resizable: false},
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', sortable: true,lockPosition:true , resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
      { assessmentName: 'Geography Quiz', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Chemistry Lab', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'Biology Exam', assessmentType: 'Test', isActive: true },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with row sorting enabled. Users can click on the row headers to sort the data in ascending or descending order based on the selected row.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowSpanning: Story = {
  args: {
    columnDefs: [
      { 
        field: 'athlete', 
        headerName: 'Athlete', 
        autoHeight: true,
        rowSpan: function(params){
          const athlete = params.data.athlete;
          if (athlete === "Aleksey Nemov") {
            return 2;
          } else if (athlete === "Ryan Lochte") {
            return 4; 
          } else {
            return 1; 
          }
        },
        cellClassRules: {
          'cell-span': "value==='Aleksey Nemov' || value==='Ryan Lochte'",
        },
        width: 200 
      },
      { field: 'age', headerName: 'Age', width: 100 },
      { field: 'country', headerName: 'Country' },
      { field: 'year', headerName: 'Year', width: 100 },
      { field: 'date', headerName: 'Date' },
      { field: 'sport', headerName: 'Sport' },
      { field: 'gold', headerName: 'Gold Medals' },
      { field: 'silver', headerName: 'Silver Medals' },
      { field: 'bronze', headerName: 'Bronze Medals' },
      { field: 'total', headerName: 'Total Medals' },
    ],
    dataSource: [
      { athlete: 'Aleksey Nemov', age: 28, country: 'Russia', year: 2000, date: '2000-09-01', sport: 'Gymnastics', gold: 1, silver: 0, bronze: 0, total: 1 },
      { athlete: 'Ryan Lochte', age: 27, country: 'United States', year: 2012, date: '2012-08-05', sport: 'Swimming', gold: 2, silver: 0, bronze: 0, total: 2 },
      { athlete: 'Michael Phelps', age: 23, country: 'United States', year: 2008, date: '2008-08-17', sport: 'Swimming', gold: 8, silver: 0, bronze: 0, total: 8 },
      { athlete: 'Usain Bolt', age: 30, country: 'Jamaica', year: 2016, date: '2016-08-14', sport: 'Athletics', gold: 3, silver: 0, bronze: 0, total: 3 },
      { athlete: 'Ryan Lochte', age: 32, country: 'United States', year: 2016, date: '2016-08-12', sport: 'Swimming', gold: 1, silver: 0, bronze: 0, total: 1 },
      { athlete: 'Aleksey Nemov', age: 30, country: 'Russia', year: 2004, date: '2004-08-20', sport: 'Gymnastics', gold: 0, silver: 2, bronze: 1, total: 3 },
    ],
  },
  render: (args) => ({
    props: args,
    template: `
    <app-easy-grid
      style="width: 100%; height: 100%;"
      [columnDefs]="columnDefs"
      [rowData]="dataSource"
      autoSizeColumnsToFit="size"
      [pagination]="false"
      >
    </app-easy-grid>
`,
  }),
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with row spanning functionality. The "Athlete" column dynamically spans multiple rows based on the athlete’s name. For the athlete "Aleksey Nemov," the rows span 2 rows, while for "Ryan Lochte," they span 4 rows. Other athletes occupy a single row. This feature enhances data organization and clarity by visually grouping related information together.'
      },
      source: {
        code: `
          <app-easy-grid 
            [columnDefs]="columnDefs" 
            [rowData]="rowData" 
            autoSizeColumnsToFit="size">
          </app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};

export const RowSelection: Story = {
  args: {
    columnDefs: [
      { field: 'assessmentName', headerName: 'Assessment Name', lockPosition: true, sortable: false, resizable: false,  checkboxSelection: true, },
      { field: 'assessmentType', headerName: 'Assessment Type', lockPosition: true, sortable: false, resizable: false },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Test', isActive: true },
    ],
    options: {
      rowSelection: 'multiple',
      onRowSelected: (event) => {
        console.log('Row selected:', event.node.data);
      }
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'This story showcases the `Easygrid Component` with row selection enabled. Users can select both single and multiple rows, and selected row data will be logged to the console.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};


export const ValueFormatter: Story = {
  args: {
    columnDefs: [
      {
        field: 'assessmentName',
        headerName: 'Assessment Name',
        lockPosition: true,
        sortable: false,
        resizable: false,
      },
      {
        field: 'assessmentType',
        headerName: 'Assessment Type',
        lockPosition: true,
        sortable: false,
        resizable: false,
        valueFormatter: (item) => {
          return item.value ? item.value.replace(/_/g, ' ') : '';
        },
      },
      { headerName: 'Active', field: 'isActive', cellRenderer: 'booleanCellRenderer', lockPosition: true, sortable: false, resizable: false },
    ],
    dataSource: [
      { assessmentName: 'Math Test', assessmentType: 'Quiz_Test', isActive: true },
      { assessmentName: 'Science Project', assessmentType: 'Homework_Assignment', isActive: false },
      { assessmentName: 'History Exam', assessmentType: 'Final_Exam', isActive: true },
    ],
    
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the `Easygrid Component` with a value formatter applied to the Assessment Type column, replacing underscores with spaces for better readability.',
      },
      source: {
        code: `
          <app-easy-grid [columnDefs]="columnDefs" [rowData]="dataSource" [gridOptions]="options" autoSizeColumnsToFit="size"></app-easy-grid>
        `,
        language: 'html',
      },
    },
  },
};















