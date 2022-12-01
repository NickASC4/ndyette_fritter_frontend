<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteCommunityForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/communities?id=id',
      method: 'DELETE',
      hasBody: true,
      fields: [
        {id: 'id', label: 'ID', value: ''}
      ],
      title: 'Delete community',
      callback: () => {
        const message = 'Successfully deleted your community!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>