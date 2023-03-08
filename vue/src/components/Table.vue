<template>
  <div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column label="Index" prop="index"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Code" prop="code"></el-table-column>
      <el-table-column label="Status" prop="status"></el-table-column>
      <el-table-column label="Action">
        <template #default="{row}">
          <el-button type="text" @click="handleView(row)">View</el-button>
          <el-button type="text" @click="handleEdit(row)">Edit</el-button>
          <el-button type="text" @click="handleDelete(row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { ref } from 'vue';
import { ElTable, ElTableColumn, ElButton } from 'element-plus';

export default {
  name: 'TableComponent',
  components: {
    ElTable,
    ElTableColumn,
    ElButton,
  },
  setup() {
    const tableData = ref([
      {
        index: 1,
        name: 'John Doe',
        code: 'JD001',
        status: 'Active',
      },
      {
        index: 2,
        name: 'Jane Doe',
        code: 'JD002',
        status: 'Inactive',
      },
    ]);

    const handleView = (row) => {
      console.log('View Row Data:', row);
    };

    const handleEdit = (row) => {
      console.log('Edit Row Data:', row);
    };

    const handleDelete = (row) => {
      console.log('Delete Row Data:', row);
    };

    return {
      tableData,
      handleView,
      handleEdit,
      handleDelete,
    };
  },
};
</script>
