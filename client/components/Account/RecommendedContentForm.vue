<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'RecommendedContentForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/users',
      method: 'PATCH',
      hasBody: true,
      contentPreference: true,
      fields: [
        {id: 'recommendedContent', label: "Recommended Content", value: true}
      ],
      title: 'Increment Recommended Content',
      callback: () => {
        const message = 'Successfully incremented recommended content!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};

</script>